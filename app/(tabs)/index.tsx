import { Button, Text, Pressable, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const url = "https://4z2wwbvd-8000.brs.devtunnels.ms/0.m3u8";
  // "http://127.0.0.1:8000/0.m3u8";
  // "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3";

  async function playSound() {
    try {
      console.log("Loading Sound");
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const resume = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const foward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      console.log(status.positionMillis);
      await sound.setPositionAsync(status.positionMillis + 11000);
    }
  };

  const backward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      console.log(status.positionMillis);
      await sound.setPositionAsync(status.positionMillis - 11000);
    }
  };

  const getStatus = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      console.log(status);
    }
  };

  const sendPostBackground = async () => {
    try {
      const response = await fetch("https://4z2wwbvd-8000.brs.devtunnels.ms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "hola nawe" }),
      });
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  let interval = setInterval(() => {
    sendPostBackground();
  }, 1000);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          setIsPlaying(false);
          sound.unloadAsync();
          setSound(null);
        }
      : undefined;
  }, [sound]);
  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      // sound.unloadAsync();
    }
  };
  const stop = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
      setIsPlaying(false);
      // sound.unloadAsync();
    }
  };

  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={playSound}
      >
        <Text>play</Text>
      </Pressable>
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={resume}
      >
        <Text>resume</Text>
      </Pressable>
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={stop}
      >
        <Text>stop</Text>
      </Pressable>
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={pause}
      >
        <Text>pause</Text>
      </Pressable>
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={foward}
      >
        <Text>foward</Text>
      </Pressable>
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={backward}
      >
        <Text>backward</Text>
      </Pressable>
      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={getStatus}
      >
        <Text>status</Text>
      </Pressable>

      <Pressable
        style={{
          height: 54,
          width: 60,
          backgroundColor: "green",
          marginBottom: 20,
        }}
        onPress={() => {
          clearInterval(interval);
        }}
        // onPress={sendPostBackground}
      >
        <Text>stop interval</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
