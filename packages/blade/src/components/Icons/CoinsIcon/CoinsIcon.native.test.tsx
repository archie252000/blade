import CoinsIcon from './';
import renderWithTheme from '~utils/testing/renderWithTheme.native';

describe('<CoinsIcon />', () => {
  it('should render CoinsIcon', () => {
    const renderTree = renderWithTheme(
      <CoinsIcon color="feedback.icon.neutral.lowContrast" size="large" />,
    ).toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
