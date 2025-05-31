import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const GoLiveb = () => {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [webViewRef, setWebViewRef] = useState(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  const goBack = () => {
    if (webViewRef && canGoBack) {
      webViewRef.goBack();
    }
  };

  const reload = () => {
    if (webViewRef) {
      webViewRef.reload();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={goBack}
          disabled={!canGoBack}
          style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reload} style={styles.navButton}>
          <Text style={styles.navButtonText}>⟳ Reload</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00acee" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Error Fallback */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load website</Text>
          <TouchableOpacity onPress={reload} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          ref={setWebViewRef}
          source={{ uri: 'https://restream.io' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onNavigationStateChange={handleNavigationStateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark background like Restream
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#121212', // same as container for seamless integration
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#1f1f1f',
    borderRadius: 6,
  },
  navButtonDisabled: {
    backgroundColor: '#3a3a3a',
  },
  navButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
});

export default GoLiveb;
