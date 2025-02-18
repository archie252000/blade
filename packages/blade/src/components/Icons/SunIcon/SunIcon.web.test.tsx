import SunIcon from './';
import renderWithTheme from '~utils/testing/renderWithTheme.web';

describe('<SunIcon />', () => {
  it('should render SunIcon', () => {
    const { container } = renderWithTheme(
      <SunIcon color="feedback.icon.neutral.lowContrast" size="large" />,
    );
    expect(container).toMatchSnapshot();
  });
});
