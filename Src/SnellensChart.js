import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SnellenChart = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Snellen Chart</Text>
            <View style={styles.chartContainer}>
                {/* Example Snellen chart with text characters */}
                <View style={styles.chartRow}>
                    <Text style={styles.chartText}>E</Text>
                    <Text style={styles.chartText}>F</Text>
                    <Text style={styles.chartText}>P</Text>
                    <Text style={styles.chartText}>T</Text>
                    <Text style={styles.chartText}>O</Text>
                </View>
                <View style={styles.chartRow}>
                    <Text style={styles.chartText}>Z</Text>
                    <Text style={styles.chartText}>L</Text>
                    <Text style={styles.chartText}>P</Text>
                    <Text style={styles.chartText}>E</Text>
                    <Text style={styles.chartText}>D</Text>
                </View>
                {/* Add more rows with Snellen chart characters */}
            </View>
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
