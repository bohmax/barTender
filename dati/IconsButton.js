import {Image} from 'react-native';

export const IconsButton =
    {
        back: {
            enum: 1,
            name: 'back',
            iconJSX:
                <Image
                    source={require('../image/icons/back.png')}
                    style={{
                        width: 80,
                        height: 20,
                        resizeMode: 'contain',
                    }}
                />
        },
        logout: {
            enum: 2,
            name: 'logout',
            iconJSX:
                <Image
                    source={require('../image/icons/logout.png')}
                    style={{
                        width: 80,
                        height: 20,
                        resizeMode: 'contain'
                    }}
                />
        },
        menu: {
            enum: 3,
            name: 'menu',
            iconJSX:
                <Image
                    source={require('../image/icons/menuButton.png')}
                    style={{
                        width: 80,
                        height: 20,
                        resizeMode: 'contain'
                    }}
                />
        },
        none: {
            enum: 0,
            name: 'none',
            iconJSX:
                <></>
        }
    }
