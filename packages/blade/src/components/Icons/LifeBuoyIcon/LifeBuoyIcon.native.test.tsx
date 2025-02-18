import LifeBuoyIcon from './';
import renderWithTheme from '~utils/testing/renderWithTheme.native';

describe('<LifeBuoyIcon />', () => {
  it('should render LifeBuoyIcon', () => {
    const renderTree = renderWithTheme(
      <LifeBuoyIcon color="feedback.icon.neutral.lowContrast" size="large" />,
    ).toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
