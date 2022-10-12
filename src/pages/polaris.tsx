import React from "react";
import { createUseStyles } from "react-jss";
import io from "socket.io-client";
import QRCode from "react-qr-code";
import PolarisLogo from "../assets/polaris-logo.png";

const socket = io(process.env.REACT_APP_WS_SERVER as string);
const host = process.env.REACT_APP_DEEPLINK_HOST as string;
const backendShareEndpoint = process.env.REACT_APP_BACKEND_SHARE_ENDPOINT as string;
const backendDownloadEndpoint = process.env.REACT_APP_BACKEND_DOWNLOAD_ENDPOINT as string;
const clientId = process.env.REACT_APP_CLIENT_ID as string;

const PolarisPage = () => {
    const classes = useStyles();
    const [qrValue, setQRValue] = React.useState('');
    const [step, setStep] = React.useState(1);

    React.useEffect(() => {
        socket.on('connect', () => {
            const url = new URL(host);
            url.searchParams.append('redirect_uri', backendShareEndpoint);
            url.searchParams.append('title', 'Polaris');
            url.searchParams.append('description', 'Polaris - medical certificate');
            url.searchParams.append('claims', 'name,address,birthDate,email');
            url.searchParams.append('client_id', clientId);
            url.searchParams.append('state', socket.id);
            const newQRValue = url.toString();
            setQRValue(newQRValue);
        });

        socket.on('disconnect', () => { });

        socket.on('shared-identity-client', (args) => {
            const url = new URL(backendDownloadEndpoint);
            url.searchParams.append('fileName', args);
            const newQRValue = url.toString();
            setQRValue(newQRValue);
            setStep(2);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('shared-identity-client');
        };
    }, []);
    
    return (
        <div className={classes.container}>
            <div className={classes.columnLeft}>
                <img className={classes.logo} src={PolarisLogo}/>
            </div>
            <div className={classes.columnRigth}>
                <h5>Hi, Doe Joe</h5>
                <h1>Lorem ipsum dolor sit amet</h1>
                <div className={classes.content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in neque eget neque tempus blandit eget et odio. 
                    In posuere dignissim varius. Etiam euismod ipsum ac diam faucibus vulputate.
                </div>
                <div className={classes.qr}>
                    {
                        step === 2 &&
                        <React.Fragment>
                            <h3>¡Felicidades, ya puedes descargar tu credencial!</h3>
                            <span style={{fontSize: '3rem', color: '#21C0AC'}}><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                        </React.Fragment>
                     }
                    <br/>
                    <QRCode value={qrValue}/>
                </div>
            </div>
        </div>
    )
}

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        color: '#1A215D'
    },
    logo: {
        width: '250px',
        height: 'auto'
    },
    columnLeft: {
        padding: '2rem',
        flex: 1
    },
    columnRigth: {
        padding: '2rem',
        flex: 2
    },
    content: {
        color: '#767676'
    },
    qr: {
        display: 'flex',
        marginTop: '3rem',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#767676'
    }
});

export default PolarisPage;