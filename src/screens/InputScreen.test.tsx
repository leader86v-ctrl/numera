import { Platform } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { InputScreen } from './InputScreen';

type GetByLabelText = Awaited<ReturnType<typeof render>>['getByLabelText'];

function setDateInput(getByLabelText: GetByLabelText, isoValue: string) {
  return fireEvent(getByLabelText('Birth date'), 'change', { target: { value: isoValue } });
}

describe('InputScreen (web)', () => {
  const originalPlatformOS = Platform.OS;

  beforeEach(() => {
    Platform.OS = 'web';
  });

  afterEach(() => {
    Platform.OS = originalPlatformOS;
  });

  it('disables Calculate until name and date are both provided', async () => {
    const onCalculate = jest.fn();
    const { getByTestId, getByLabelText } = await render(<InputScreen onCalculate={onCalculate} />);

    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);

    await fireEvent.changeText(getByTestId('name-input'), 'Anna');
    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);

    await setDateInput(getByLabelText, '1980-11-23');

    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(false);
  });

  it('disables Calculate again if the name is cleared', async () => {
    const onCalculate = jest.fn();
    const { getByTestId } = await render(
      <InputScreen
        initialName="Anna"
        initialDate={{ day: 23, month: 11, year: 1980 }}
        onCalculate={onCalculate}
      />,
    );

    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(false);

    await fireEvent.changeText(getByTestId('name-input'), '   ');
    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);
  });

  it('disables Calculate for an impossible calendar date', async () => {
    const onCalculate = jest.fn();
    const { getByTestId, getByLabelText } = await render(<InputScreen onCalculate={onCalculate} />);

    await fireEvent.changeText(getByTestId('name-input'), 'Anna');
    await setDateInput(getByLabelText, '2000-02-31');

    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);
  });

  it('calls onCalculate with the trimmed name and selected date when pressed', async () => {
    const onCalculate = jest.fn();
    const { getByTestId, getByLabelText } = await render(<InputScreen onCalculate={onCalculate} />);

    await fireEvent.changeText(getByTestId('name-input'), '  Anna  ');
    await setDateInput(getByLabelText, '1980-11-23');
    await fireEvent.press(getByTestId('calculate-button'));

    expect(onCalculate).toHaveBeenCalledWith('Anna', { day: 23, month: 11, year: 1980 });
  });

  it('pre-fills the date input from initialDate', async () => {
    const { getByLabelText } = await render(
      <InputScreen
        initialName="Anna"
        initialDate={{ day: 23, month: 11, year: 1980 }}
        onCalculate={() => {}}
      />,
    );

    expect(getByLabelText('Birth date').props.value).toBe('1980-11-23');
  });
});

describe('InputScreen (non-web fallback)', () => {
  const originalPlatformOS = Platform.OS;

  beforeEach(() => {
    Platform.OS = 'ios';
  });

  afterEach(() => {
    Platform.OS = originalPlatformOS;
  });

  it('falls back to day/month/year dropdowns and still enables Calculate', async () => {
    const onCalculate = jest.fn();
    const { getByTestId } = await render(<InputScreen onCalculate={onCalculate} />);

    await fireEvent.changeText(getByTestId('name-input'), 'Anna');
    await fireEvent(getByTestId('day-picker'), 'valueChange', '23');
    await fireEvent(getByTestId('month-picker'), 'valueChange', '11');
    await fireEvent(getByTestId('year-picker'), 'valueChange', '1980');
    await fireEvent.press(getByTestId('calculate-button'));

    expect(onCalculate).toHaveBeenCalledWith('Anna', { day: 23, month: 11, year: 1980 });
  });
});
