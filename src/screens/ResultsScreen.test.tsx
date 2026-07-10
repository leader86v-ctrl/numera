import { fireEvent, render } from '@testing-library/react-native';
import { ResultsScreen } from './ResultsScreen';

const FIXED_DATE = { day: 23, month: 11, year: 1980 };

describe('ResultsScreen', () => {
  it('renders the three result cards for a fixed name and date', async () => {
    const { toJSON } = await render(
      <ResultsScreen name="ANNA" date={FIXED_DATE} onCalculateAgain={() => {}} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onCalculateAgain when the button is pressed', async () => {
    const onCalculateAgain = jest.fn();
    const { getByTestId } = await render(
      <ResultsScreen name="ANNA" date={FIXED_DATE} onCalculateAgain={onCalculateAgain} />,
    );

    await fireEvent.press(getByTestId('calculate-again-button'));

    expect(onCalculateAgain).toHaveBeenCalledTimes(1);
  });
});
