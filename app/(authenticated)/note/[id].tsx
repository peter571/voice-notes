import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { usePathname, useRouter } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import AudioPlayerProgressBar from "@/components/audio-progress-bar";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { globalStyles } from "@/styles";
import { ScrollView } from "react-native-gesture-handler";

export default function NotePreview() {
  const params = useLocalSearchParams<{
    id: string;
  }>();
  const { isPlaying, playPause, position, duration } = useAudioPlayer(
    "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3"
  );

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s2,
        paddingBottom: 200,
      }}
    >
      <Header title="Voice Note" />
      <View
        style={{
          marginVertical: theme.spacing.s4,
        }}
      >
        <AudioPlayerProgressBar position={position} duration={duration} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: theme.spacing.s4,
          }}
        >
          <View
            style={{
              gap: theme.spacing.s2,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.t6,
                fontFamily: theme.fontFamily.body.Montserrat.bold,
                color: "#323743FF",
              }}
            >
              Lorem ipsum.
            </Text>
            <Text
              style={{
                fontSize: theme.fontSize.t3,
                fontFamily: theme.fontFamily.body.Montserrat.regular,
                color: "#9095A1FF",
              }}
            >
              Lorem ipsum dolor sit amet.
            </Text>
          </View>
          <Pressable style={styles.playButton} onPress={playPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={19}
              color={theme.colors.white}
            />
          </Pressable>
        </View>
      </View>
      <Text style={globalStyles.title}>Summary</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: theme.spacing.s4,
        }}
      >
        <Text style={globalStyles.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          consectetur sint magni, ullam modi distinctio obcaecati quos expedita
          nesciunt vero, ipsa excepturi minus fuga hic culpa tenetur, illum
          facere esse sequi eveniet? Vero, quaerat magnam perferendis quos
          repellendus explicabo molestias eaque, eos repellat dignissimos
          expedita, sapiente voluptatem earum? Quidem, pariatur. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Deserunt ducimus sit
          obcaecati molestias laborum! Iusto rerum omnis accusamus atque
          recusandae perspiciatis dignissimos sequi, voluptatem assumenda
          accusantium! Nam maxime ipsam dignissimos delectus error excepturi et
          harum quasi aperiam, odit quia. Rem est doloremque et quisquam
          tempora. Nemo quae nam laudantium consequatur soluta, praesentium
          molestias iusto rerum! Ut expedita illo laudantium tenetur maxime
          incidunt temporibus sed eveniet atque accusamus eius, quis sint sequi
          nisi! Facere aut asperiores, modi corrupti dolor rerum laboriosam
          saepe animi sint vel provident molestias est nobis ad ut iste? Quaerat
          natus reiciendis laudantium consequatur at voluptates praesentium
          quod? Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
          ex mollitia. Qui tempore distinctio odit a ut magnam aperiam et non
          obcaecati corrupti velit recusandae, nihil necessitatibus cupiditate
          cumque pariatur praesentium sint architecto perferendis ipsa animi
          iste voluptates. Quis dolor tempora dolores, enim vel rerum cumque
          amet sed, voluptatibus nobis exercitationem vitae natus et! In maiores
          dignissimos, enim ab suscipit id, cupiditate tenetur harum placeat,
          unde temporibus molestiae. Placeat quas doloremque ratione alias
          blanditiis omnis ipsa fuga velit atque temporibus dolorum iure
          nesciunt iste laborum facere dolore a optio, doloribus possimus porro
          nihil? Autem, dolores saepe molestias error necessitatibus enim
          tempore tempora aspernatur ut hic itaque ipsum possimus, fuga non
          officia dolore iure cupiditate. Nisi rem delectus iste, aspernatur
          facere perferendis error quaerat iusto suscipit, voluptate, in nostrum
          voluptatum doloribus placeat fugit a ab veritatis. Deleniti ullam
          molestias sunt consectetur amet deserunt autem quis assumenda sit
          tempora. Dolorem illo modi maxime harum vero doloremque maiores, a hic
          autem culpa recusandae nesciunt exercitationem in repellat vitae totam
          adipisci odio suscipit dicta laudantium iste. Dolorem incidunt rerum,
          quia odio quae repellendus, nihil obcaecati porro delectus et aut quod
          vero! Enim rerum quibusdam dolor autem magni error cumque explicabo
          quasi sapiente voluptatum et beatae perspiciatis alias exercitationem,
          impedit fugit libero labore, ab, a nobis inventore fugiat excepturi
          perferendis. Ipsa impedit excepturi magnam beatae quia qui quae iusto
          soluta aut? Eveniet ipsam ipsum eum explicabo, voluptate quisquam
          reiciendis, saepe sed ex impedit ad maiores at minima fugiat quod
          laboriosam, libero sapiente deserunt. Provident deleniti amet deserunt
          praesentium placeat recusandae quia non obcaecati suscipit nostrum.
          Quod qui odit velit, dicta nemo aperiam doloribus eius sint eos magni
          soluta tempora. Dolore ex asperiores optio quas doloribus? Adipisci
          laboriosam id ex voluptas harum iusto minima suscipit sequi a odio at
          maxime saepe veniam natus illo vero, porro fugit eveniet quasi
          quisquam voluptatem. Voluptatum nesciunt ab consequuntur id et enim
          impedit repudiandae eius reprehenderit? Sunt, ipsam omnis? Sunt ipsam
          sed perspiciatis cumque aliquam delectus nam accusamus, ab inventore.
          Inventore accusantium repellat quia fuga deserunt, ipsa voluptatem
          saepe impedit fugit labore nesciunt. Voluptates, sapiente. Facere
          voluptates natus delectus, possimus harum blanditiis, tempore nulla
          minima suscipit incidunt saepe quo praesentium officia in expedita
          nobis magni dolor reprehenderit alias amet porro? Dolorum, similique
          possimus. Dicta architecto cum enim, vitae pariatur, magni corrupti
          perspiciatis magnam dolor hic tenetur illum quis unde minus cumque
          iure iste aspernatur officiis? Fugiat, corrupti odit repellendus error
          suscipit, recusandae voluptates facilis modi quia alias aperiam
          facere? Neque laudantium similique nostrum fuga dicta veniam ad quo
          tempora odio. Ab quasi, est quis numquam unde laborum ipsum expedita
          quisquam amet, eum deserunt. Ullam cum, vero nostrum est placeat et
          suscipit error quisquam aliquam, unde pariatur voluptates ipsam ea
          veniam, quibusdam totam voluptatum consectetur libero laudantium! Rem
          cumque consectetur quia voluptates vitae! Consectetur, cum optio
          dolorem voluptatem cupiditate accusamus sed culpa fugiat ratione
          numquam maiores veniam consequatur, commodi similique officia
          recusandae accusantium? Aut possimus amet commodi magnam, consequuntur
          consectetur porro autem eius reprehenderit quam asperiores illo
          sapiente minima voluptas voluptatum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: theme.colors.primary.DEFAULT,
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
