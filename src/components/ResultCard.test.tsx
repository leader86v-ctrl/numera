import { fireEvent, render } from '@testing-library/react-native';
import { ResultCard } from './ResultCard';

describe('ResultCard', () => {
  it('renders the short interpretation by default', async () => {
    const { getByTestId } = await render(
      <ResultCard
        title="Psychic"
        compound={23}
        single={5}
        short="Short copy"
        detail="Detailed copy"
      />,
    );

    expect(getByTestId('psychic-card')).toHaveTextContent('Short copy', { exact: false });
  });

  it('expands to the detail text when tapped, and collapses back on a second tap', async () => {
    const { getByTestId } = await render(
      <ResultCard
        title="Psychic"
        compound={23}
        single={5}
        short="Short copy"
        detail="Detailed copy"
      />,
    );

    await fireEvent.press(getByTestId('psychic-card'));
    expect(getByTestId('psychic-card')).toHaveTextContent('Detailed copy', { exact: false });

    await fireEvent.press(getByTestId('psychic-card'));
    expect(getByTestId('psychic-card')).toHaveTextContent('Short copy', { exact: false });
  });
});
