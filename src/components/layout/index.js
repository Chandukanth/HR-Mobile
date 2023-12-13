import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import the hamburger icon from Expo icons
import SideMenu from 'react-native-side-menu';
import SideMenuContent from './sidemenu';
import { useNavigation } from '@react-navigation/native';
import { isClosingState, sideMenu } from '../../lib/atom';
import { useRecoilState } from 'recoil';

const Layout = ({ children, title, noChildren, tabView, backButton, backPress }) => {
    const [isMenuOpen, setMenuOpen] = useRecoilState(sideMenu);
    const [isClosing, setIsClosing] = useRecoilState(isClosingState);
    const [marginTop, setMarginTop] = useState(0)

    const navigation = useNavigation();
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Add animation logic here
        Animated.timing(translateY, {
            toValue: isClosing ? marginTop : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [isClosing]);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const closing = (value) => {
        if (value > 0.95) {
            setMarginTop(value * 50)
        } else {
            setMarginTop(0)
        }
        setIsClosing(value > 0.92)
    }

    const backButtonOnPress = () => {
        if (backPress) {
            backPress()
        } else {
            navigation.goBack()
        }

    }

    return (
        <SideMenu
            menu={<SideMenuContent navigation={navigation} setMenuOpen={setMenuOpen} />}
            isOpen={isMenuOpen}
            onChange={(isOpen) => setMenuOpen(isOpen)}
            onSliding={closing}
            openMenuOffset={300}
            edgeHitWidth={200}
        >
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    opacity: isClosing ? 0.5 : 1,
                    borderRadius: isClosing ? 12 : 0,
                    marginVertical: isClosing ? 20 : 0,

                }}
            >
                <View style={{ padding: 16, alignItems: 'center', flexDirection: 'row', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    {backButton ? (
                        <TouchableOpacity onPress={backButtonOnPress}>
                            <AntDesign name="back" size={24} color="black" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={toggleMenu}>
                            <AntDesign name="menuunfold" size={24} color="black" />
                        </TouchableOpacity>
                    )}

                    <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>{title}</Text>
                </View>

                {!noChildren && (
                    <View style={{ flex: 1, }}>
                        {children}
                    </View>
                )}
                {tabView}

            </Animated.View>
        </SideMenu>
    );
};

export default Layout;
