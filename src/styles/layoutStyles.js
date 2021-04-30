export const primaryColor = '#0887ff';
export const secondaryColor = '#ffab40';
export const tertiaryColor = '#1d4e5f';

export const rootContainer = {
  height: '100%',
  'min-height': '100%',
  display: 'flex',
  'flex-direction': 'column',
}

export const inlineContainer = {
  height:'100%',
  width:'100%',
  display: 'inline',
  'overflow-x': 'hidden',
  'overflow-y': 'auto',
  'text-align': 'center',
  align : 'center',
}

export const rowContainerNoWrap = {
  width: '100%',
  height : 'auto',
  display: 'flex',
  'flex-direction': 'Row',  
  'flex-wrap' : 'nowrap',
  'align-items' : 'baseline',
  'align-content' : 'center',
  marginTop : '40px', 
  marginBottom : '0',
  marginLeft : 50,
  
}

export const rowContainerWrapped = {
  width: '100%',
  height : 'auto',
  display: 'flex',
  'flex-direction': 'Row',
  'flex-wrap' : 'wrap',
  //'align-items' : 'baseline',
}

export const rowContainerLeftAligned ={
  width: '100%',
  height : 'auto',
  display: 'flex',
  'flex-direction': 'Row',
  'justify-content' : 'flex-start',
  'align-items': 'flex-start',
  'align-content' : 'flex-start',
}

const tileWidth = 180;
const tileHeight = 240;
const tilePadding = 15;
const tileMargin = 15;

export const tileContainer = theme => ({
  width: tileWidth,
  height: tileHeight,
  padding: tilePadding,
  'text-align': 'center',
  'marginTop' : 0,
  'marginLeft' : tileMargin,
  overflow: 'auto',
  '&:hover':{
    cursor: 'pointer',
    backgroundColor: theme.palette.action.hover,
  }
})

export const tileContainerDisabled = theme => ({
  width: tileWidth,
  height: tileHeight,
  padding: tilePadding,
  'text-align': 'center',
  'marginTop' : 0,
  'marginLeft' : tileMargin,
  overflow: 'auto',
  backgroundColor : theme.palette.type === "dark"? theme.palette.grey[900] : theme.palette.grey[200],
})

export const columnContainer ={
  width: '100%',
  height : tileHeight / 7 *4,
  display: 'flex',
  'flex-direction': 'Column',
  'flex-wrap' : 'wrap',
  'justify-content' : 'flex-start',
  'align-items': 'flex-start',
  'align-content' : 'flex-start',
}

export const columnContainerCentered ={
  width: 'auto',
  height : 'auto',
  display: 'flex',
  'flex-direction': 'Column',
  'justify-content' : 'center',
  'align-items': 'baseline',
  'align-content' : 'center',
}

export const columnContainerLeftAligned ={
  width: 'auto',
  height : 'auto',
  display: 'flex',
  'flex-direction': 'Column',
  'justify-content' : 'flex-start',
  'align-items': 'flex-start',
  'align-content' : 'flex-start',
}

export const tileBusyColumn ={
  ...columnContainerCentered,
  height : tileHeight / 7 *4,
}

export const horizontalUl ={
  height: 'auto',
  padding: 0,
  margin: 15,
  overflow: 'hidden',
  'list-style-type': 'none',
};

export const horizontalLi ={
  height: 'auto',
  marginTop : 0,
  marginBottom : 0,
  paddingTop : 0,
  paddingBottom : 0,
  float: 'left',
};