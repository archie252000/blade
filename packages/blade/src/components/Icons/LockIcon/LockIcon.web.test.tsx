import LockIcon from '.';
import renderWithTheme from '~utils/testing/renderWithTheme.web';

describe('<LockIcon />', () => {
  it('should render LockIcon', () => {
    const { container } = renderWithTheme(
      <LockIcon color="feedback.icon.neutral.lowContrast" size="large" />,
    );
    expect(container).toMatchSnapshot();
  });
});
