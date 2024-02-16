import React, { useContext } from 'react'
import { SettingContext } from '../../context/SettingsContext'
import { Stack, ToggleButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HomeIcon from '@mui/icons-material/Home';
type Props = {}

function IDEHeader({ }: Props) {

  const { settings, changeThemeScheme, toggleTheme } = useContext(SettingContext)

  return (
    <div style={{
      padding: '2px 10px',
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      <h3 style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <a href="/" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <HomeIcon sx={{
          }} />
        </a>
        Python IDE
        </h3>      <Stack direction={'row'} spacing={2}>
        <ToggleButton
          style={{ borderRadius: "50px", border: "none" }}
          value="check"
          onChange={toggleTheme}
        >
          {settings.themeMode === "dark" && <LightModeIcon color={"secondary"} />}
          {settings.themeMode === "light" && <DarkModeIcon color={"secondary"} />}
        </ToggleButton>
        <ToggleButton
          value={"check"}
          style={{ borderRadius: "50px", border: "none" }}
          onChange={changeThemeScheme}
        >
          <ColorLensIcon color={"secondary"} />
        </ToggleButton>
      </Stack>
    </div>
  )
}

export default IDEHeader