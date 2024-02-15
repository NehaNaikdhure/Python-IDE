import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    CircularProgress,
    Container,
    Slider,
    Switch,
    TextField,
    TextFieldProps,
    Typography,
    styled,
    useTheme,
} from "@mui/material";
import React, { useContext, useEffect } from 'react'
import { SettingContext } from '../../context/SettingsContext'
import { useNavigate } from "react-router-dom";
import Examples from "./Examples";

type Props = {}

function Home({ }: Props) {
    const { settings } = useContext(SettingContext)
    const navigation = useNavigate()
    return (
        <div>
            <Container sx={{
                display: 'flex',
                minHeight: "70vh",
                height: "100%",
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: settings.screen === "mobile" ? "column" : "row",
            }}>
                <a href="/ide">
                    <Card sx={{
                        margin: 2, padding: 5, ":hover": {
                            backgroundColor: "#00FF001F"
                        }
                    }}
                    >
                        <CardMedia
                            component="img"
                            image="/images/home/programming.png"
                            alt="IDE"
                            style={{
                                maxHeight: "250px",
                                height: "100%",
                            }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Python IDE
                            </Typography>
                        </CardContent>
                    </Card>
                </a>
                <a href="/notebook">
                    <Card sx={{
                        margin: 2, padding: 5, ":hover": {
                            backgroundColor: "#00FF001F"
                        }
                    }}
                    >
                        <CardMedia
                            component="img"
                            image="/images/home/notebook.png"
                            alt="Notebook"
                            style={{
                                maxHeight: "250px",
                                height: "100%",
                            }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Python Notebook
                            </Typography>
                        </CardContent>
                    </Card>
                </a>
            </Container>
            <Examples />
        </div>
    )
}

export default Home