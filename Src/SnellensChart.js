import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SnellenChart = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.warning}>Close either eye before viewing</Text>
            <Image
                source={require('./../assets/SnellensChart.jpg')}
                style={styles.chartImage}
                resizeMode="contain"
            />
            <Text style={styles.title}>Snellen Chart</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    warning: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 8,
    },
    chartImage: {
        width: 200, // Adjust the width according to your image size
        height: 200, // Adjust the height according to your image size
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    chartContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    chartRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    chartText: {
        fontSize: 12,
    },
});

export default SnellenChart;
