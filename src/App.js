import { useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MSiderbar from './scenes/layout/MSidebar';
import MTopbar from './scenes/layout/MTopbar';
import MRoutes from './routes/MRoutes';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <MSiderbar isSidebar={isSidebar} />
          <main className="content">
            <MTopbar setIsSidebar={setIsSidebar} />
            <MRoutes />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
