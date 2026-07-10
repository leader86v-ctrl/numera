import { fireEvent, render } from '@testing-library/react-native';
import { InputScreen } from './InputScreen';

describe('InputScreen', () => {
  it('disables Calculate until name and date are both provided', async () => {
    const onCalculate = jest.fn();
    const { getByTestId } = await render(<InputScreen onCalculate={onCalculate} />);

    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);

    await fireEvent.changeText(getByTestId('name-input'), 'Anna');
    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);

    await fireEvent(getByTestId('day-picker'), 'valueChange', '23');
    await fireEvent(getByTestId('month-picker'), 'valueChange', '11');
    await fireEvent(getByTestId('year-picker'), 'valueChange', '1980');

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
    const { getByTestId } = await render(<InputScreen onCalculate={onCalculate} />);

    await fireEvent.changeText(getByTestId('name-input'), 'Anna');
    await fireEvent(getByTestId('day-picker'), 'valueChange', '31');
    await fireEvent(getByTestId('month-picker'), 'valueChange', '2');
    await fireEvent(getByTestId('year-picker'), 'valueChange', '2000');

    expect(getByTestId('calculate-button').props.accessibilityState.disabled).toBe(true);
  });

  it('calls onCalculate with the trimmed name and selected date when pressed', async () => {
    const onCalculate = jest.fn();
    const { getByTestId } = await render(<InputScreen onCalculate={onCalculate} />);

    await fireEvent.changeText(getByTestId('name-input'), '  Anna  ');
    await fireEvent(getByTestId('day-picker'), 'valueChange', '23');
    await fireEvent(getByTestId('month-picker'), 'valueChange', '11');
    await fireEvent(getByTestId('year-picker'), 'valueChange', '1980');
    await fireEvent.press(getByTestId('calculate-button'));

    expect(onCalculate).toHaveBeenCalledWith('Anna', { day: 23, month: 11, year: 1980 });
  });
});
