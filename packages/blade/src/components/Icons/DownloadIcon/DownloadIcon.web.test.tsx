import DownloadIcon from '.';
import renderWithTheme from '~utils/testing/renderWithTheme.web';

describe('<DownloadIcon />', () => {
  it('should render DownloadIcon', () => {
    const { container } = renderWithTheme(
      <DownloadIcon color="feedback.icon.neutral.lowContrast" size="large" />,
    );
    expect(container).toMatchSnapshot();
  });
});
