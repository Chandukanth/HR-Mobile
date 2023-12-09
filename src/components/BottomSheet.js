import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

const BottomSheet = ({isModalVisible, setModalVisible, toggleModal, children}) => {

    return (
        <View style={styles.flexView}>

            <Modal
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                isVisible={isModalVisible}
                // swipeDirection="down"
                onSwipeComplete={toggleModal}
                swipeThreshold={0.5}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.center}>
                        <View style={styles.barIcon} />
                      
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    );
}

export default BottomSheet;

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: "white",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 400,
        paddingBottom: 20,
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    barIcon: {
        width: 60,
        height: 5,
        backgroundColor: "#bbb",
        borderRadius: 3,
    },
  
});