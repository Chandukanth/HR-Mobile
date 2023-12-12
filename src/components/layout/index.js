import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import the hamburger icon from Expo icons
import SideMenu from 'react-native-side-menu';
import SideMenuContent from './sidemenu';
import { useNavigation } from '@react-navigation/native';

const Layout = ({ children, title, noChildren, tabView, backButton }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

   
    return (
        <SideMenu
            menu={<SideMenuContent navigation={navigation} setMenuOpen={setMenuOpen} />}
            isOpen={isMenuOpen}
            onChange={(isOpen) => setMenuOpen(isOpen)}
        >
            <View style={{ flex: 1, backgroundColor: '#fff', opacity: isMenuOpen ? 0.2 : 1, borderRadius : isMenuOpen ? 12 : 0 }}>

                <View style={{ padding: 16, alignItems: 'center', flexDirection: 'row', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    {backButton ? (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
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

            </View>
        </SideMenu>
    );
};

export default Layout;
