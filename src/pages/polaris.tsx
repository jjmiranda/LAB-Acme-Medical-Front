import { createUseStyles } from "react-jss";
import QRCode from "react-qr-code";
import PolarisLogo from '../assets/polaris-logo.png';

const PolarisPage = () => {
    const classes = useStyles(); 
    return (
        <div className={classes.container}>
            <div className={classes.columnLeft}>
                <img className={classes.logo} src={PolarisLogo}/>
            </div>
            <div className={classes.columnRigth}>
                <h5>Hi, Doe Joe</h5>
                <h1>Lorem ipsum dolor sit amet</h1>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in neque eget neque tempus blandit eget et odio. 
                    In posuere dignissim varius. Etiam euismod ipsum ac diam faucibus vulputate.
                </div>
                <div className={classes.qr}>
                    <QRCode value={'qrValue'}/>
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
        // alignItems: 'center'
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
    qr: {
        justifyContent: 'center',
        display: 'flex',
        marginTop: '5rem'
    }
});

export default PolarisPage;