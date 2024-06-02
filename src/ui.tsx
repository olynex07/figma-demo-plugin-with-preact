import {
  Button,
  Columns,
  Container,
  render,
  VerticalSpace
} from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import { h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import { CloseHandler, Icon, ShowIconInEditorHandler } from './types';

function Plugin() {
  const [icons, setIcons] = useState<Icon[]>([]); // State to store fetched icons

  useEffect(() => {
    // Fetch icons from API
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      const response = await fetch('https://icon-server.vercel.app/icons'); // Update the URL to match your server's URL
      const data = await response.json();
      setIcons(data);
    } catch (error) {
      console.error('Error fetching icons:', error);
    }
  };

  const handleIconClick = (icon: Icon) => {
    console.log('Icon clicked:', icon.icon);
    emit<ShowIconInEditorHandler>('SHOW_ICON_IN_EDITOR', icon.icon);
  };

  const handleCloseButtonClick = useCallback(() => {
    console.log('Close button clicked');
    emit<CloseHandler>('CLOSE');
  }, []);

  return (
    <Container
    space="medium"
    style={{
      backgroundColor: '#01204E',
      padding: '20px',
      border: '2px solid darkblue',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}
  >
    <VerticalSpace space="large" />
    <h2>Select Icon 😀</h2>
    <hr style={{border:"1px solid gray", marginTop:"10px"}}/>
    <VerticalSpace space="small" />
    <Container space="small">
      {icons.map((icon: Icon) => (
        <img
          key={icon._id}
          src={icon.icon}
          alt="Icon"
          onClick={() => handleIconClick(icon)}
          style={{ cursor: 'pointer', width: '35px', height: '35px', margin: '7px' }}
        />
      ))}
    </Container>
    <VerticalSpace space="large" />
    <Columns space="extraSmall">
      <Button fullWidth onClick={handleCloseButtonClick}>Close</Button>
    </Columns>
    <VerticalSpace space="small" />
  </Container>
  );
}

export default render(Plugin);
