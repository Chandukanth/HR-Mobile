import React, { useState } from 'react';
import { Modal, View, StyleSheet, Dimensions, Button, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const FilterDrawer = ({ isOpen, children, closeDrawer, applyFilter }) => {
    if (!isOpen) return null;

    const windowHeight = Dimensions.get('window').height;

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isOpen}
            style={{ height: 40, width: 40 }}
            onRequestClose={closeDrawer}
        >

            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(247, 247, 247, 0.5)' }}>
                <View style={[styles.bottomSheet, { height: windowHeight * 0.9 }]}>
                    <TouchableOpacity onPress={closeDrawer} style={{ alignItems: 'center', height: 3, width: 30, backgroundColor: 'lightgrey', justifyContent: 'center', marginTop: 20 }} />
                    {children}
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={closeDrawer} style={{ width: '95%', height: 40, backgroundColor: 'black', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins-Light' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    bottomSheet: {
        top: '50%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default FilterDrawer;
