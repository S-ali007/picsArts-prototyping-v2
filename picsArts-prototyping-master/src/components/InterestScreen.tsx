import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/navigation/AppNavigator";
import Svg, { Defs, G, Path, ClipPath, Polygon } from "react-native-svg";

type InterestsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "InterestScreen">;
};

type Option = {
  id: number;
  icon?: JSX.Element;
  label: string;
};

const { width, height } = Dimensions.get("window");

const InterestsScreen: React.FC<InterestsScreenProps> = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const options: Option[] = [
    {
      id: 1,
      icon: (
        <View>
          <Svg
            viewBox="0 0 47.5 47.5"
            id="celebration"
            width={44.5}
            height={44.5}
          >
            <Defs>
              <ClipPath id="a">
                <Path d="M0 38h38V0H0v38Z" />
              </ClipPath>
            </Defs>
            <G clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
              <Path
                d="M0 0a1.413 1.413 0 0 1-.268-.395l-.008.008-11.216-25.265.011-.011c-.208-.403.14-1.223.853-1.937.712-.712 1.532-1.06 1.935-.852l.01-.01 25.267 11.215-.008.009c.148.07.282.155.395.268 1.562 1.562-.971 6.627-5.657 11.313C6.628-.97 1.562 1.562 0 0"
                fill="#dd2e44"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(12.626 29.512)"
              />
              <Path
                d="m0 0-12.584-20.506-.282-.635.011-.01c-.208-.404.14-1.223.853-1.937a3.97 3.97 0 0 1 .709-.557L4-5 0 0Z"
                fill="#ea596e"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(14 25)"
              />
              <Path
                d="M0 0c4.67-4.672 7.263-9.652 5.789-11.125-1.473-1.473-6.453 1.119-11.126 5.789-4.671 4.672-7.263 9.653-5.79 11.127C-9.653 7.264-4.673 4.671 0 0"
                fill="#a0041e"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(24.012 23.934)"
              />
              <Path
                d="M0 0a.99.99 0 0 0-.734-.215c-.868.094-1.598.396-2.109.873-.541.505-.808 1.182-.735 1.862.128 1.192 1.324 2.286 3.363 2.065.793-.085 1.147.17 1.158.292.014.121-.277.446-1.069.532-.869.094-1.598.396-2.11.873-.541.505-.809 1.183-.735 1.862.13 1.192 1.325 2.286 3.362 2.065.578-.062.882.058 1.011.135.104.063.145.123.149.157.011.121-.276.446-1.071.532a1 1 0 0 0 .215 1.988c2.037-.219 2.973-1.542 2.844-2.735C3.41 9.094 2.215 8.001.176 8.221c-.578.063-.881-.057-1.01-.134-.103-.063-.145-.124-.149-.157-.013-.122.276-.447 1.071-.533 2.037-.219 2.973-1.542 2.844-2.735C2.803 3.47 1.607 2.376-.43 2.597c-.578.062-.882-.057-1.012-.134-.103-.063-.143-.124-.147-.158-.013-.121.276-.446 1.07-.532A.998.998 0 0 0 0 0"
                fill="#aa8dd8"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(19.59 23.39)"
              />
              <Path
                d="M0 0c1.973.557 3.334-.323 3.658-1.478.324-1.154-.378-2.615-2.349-3.169-.77-.216-1.001-.584-.97-.702.034-.118.425-.312 1.193-.094 1.972.554 3.333-.326 3.657-1.48.327-1.155-.377-2.614-2.35-3.17-.769-.216-1.001-.585-.967-.702.033-.117.423-.31 1.192-.095a1 1 0 1 0 .54-1.925c-1.97-.555-3.333.323-3.659 1.479-.324 1.154.379 2.613 2.353 3.169.769.217 1.001.584.967.702-.033.117-.422.312-1.191.096-1.973-.556-3.334.322-3.659 1.478-.325 1.155.378 2.614 2.352 3.17.767.215.999.585.966.701-.034.119-.422.313-1.192.096A1 1 0 1 0 0 0"
                fill="#77b255"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(31.661 14.143)"
              />
              <Path
                d="M0 0a1.001 1.001 0 0 0-.626 1.781c.218.175 5.418 4.259 12.767 3.208a.999.999 0 0 0 .848-1.131.995.995 0 0 0-1.132-.848C5.364 3.932.67.256.624.219A.994.994 0 0 0 0 0"
                fill="#aa8dd8"
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                transform="translate(24.001 16.84)"
              />
            </G>
          </Svg>
        </View>
      ),
      label: "Fun or artistic expression",
    },
    {
      id: 2,
      icon: (
        <View>
          <Svg viewBox="0 0 1024 1024" width={44.5} height={44.5}>
            {/* Outer Circle */}
            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
            <G
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></G>
            <G id="SVGRepo_iconCarrier">
              <Path
                fill="brown"
                d="M195.2 828.8a448 448 0 1 1 633.6-633.6 448 448 0 0 1-633.6 633.6zm45.248-45.248a384 384 0 1 0 543.104-543.104 384 384 0 0 0-543.104 543.104z"
              />
              {/* Inner Circle */}
              <Path
                fill="brown"
                d="M497.472 96.896c22.784 4.672 44.416 9.472 64.896 14.528a256.128 256.128 0 0 0 350.208 350.208c5.056 20.48 9.856 42.112 14.528 64.896A320.128 320.128 0 0 1 497.472 96.896zM108.48 491.904a320.128 320.128 0 0 1 423.616 423.68c-23.04-3.648-44.992-7.424-65.728-11.52a256.128 256.128 0 0 0-346.496-346.432 1736.64 1736.64 0 0 1-11.392-65.728z"
              />
            </G>
          </Svg>
        </View>
      ),
      label: "Hobby",
    },
    {
      id: 3,
      icon: (
        <View>
          <Svg viewBox="0 0 15 15" width={44.5} height={44.5} fill="none">
            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
            <G
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></G>
            <G id="SVGRepo_iconCarrier">
              {/* Main paths */}
              <Path
                d="M7.5 15V7M7.5 7.5V10.5M7.5 7.5C7.5 5.29086 5.70914 3.5 3.5 3.5H0.5V6.5C0.5 8.70914 2.29086 10.5 4.5 10.5H7.5M7.5 7.5H10.5C12.7091 7.5 14.5 5.70914 14.5 3.5V0.5H11.5C9.29086 0.5 7.5 2.29086 7.5 4.5V7.5Z"
                stroke="#000000"
              />
              {/* Leaves or sections you want in green */}
              <Path d="M7.5 7.5L11.5 3.5M7.5 10.5L3.5 6.5" stroke="#00A000" />
            </G>
          </Svg>
        </View>
      ),
      label: "Side hustle",
    },
    {
      id: 4,
      icon: (
        <View>
          <Svg width={47.5} height={47.5} viewBox="0 0 512.064 512.064">
            <G>
              <Path
                d="M244.629,111.019c-37.094,0-65.28-9.472-83.823-28.186c-25.318-25.54-24.559-59.981-24.311-71.296 l0.034-1.929c0-4.719,3.814-8.533,8.533-8.533l1.365-0.034c44.058-0.93,69.248,14.165,82.56,27.145 c17.929,17.485,27.008,42.479,27.008,74.283c0,4.659-3.746,8.465-8.414,8.533C246.583,111.01,245.601,111.019,244.629,111.019"
                fill="#91CF96"
              />
              <Path
                d="M307.162,248.522c-4.719,0-8.533-3.823-8.533-8.533c0-31.138,9.105-55.834,27.085-73.395 c14.182-13.867,41.344-30.106,90.675-29.022l1.707,0.026c4.719,0,8.533,3.823,8.533,8.533l0.051,2.688 c0.307,12.032,1.109,43.998-22.912,68.625C383.672,238.069,351.16,248.522,307.162,248.522"
                fill="#91CF96"
              />
              <Path
                d="M366.295,194.193c-1.732-4.395-6.724-6.511-11.068-4.796c-16.913,6.682-44.544,33.536-53.82,44.22 c-9.822,6.485-18.662,15.3-26.53,24.363c10.095-42.615,12.16-99.447-19.123-157.261c-0.256-1.203-0.708-2.372-1.502-3.413 c-15.906-20.932-32.947-36.378-53.649-48.614c-4.045-2.389-9.284-1.05-11.682,2.995c-2.398,4.062-1.058,9.293,2.995,11.691 c18.21,10.769,33.331,24.448,47.505,42.735c0.077,0.171,0.068,0.35,0.154,0.503c60.015,107.733-7.108,212.992-7.791,214.042 c-2.569,3.942-1.468,9.224,2.475,11.802c1.442,0.947,3.063,1.399,4.668,1.399c2.773,0,5.504-1.357,7.142-3.857 c0.222-0.341,6.818-10.684,14.268-28.049c0.29-0.23,0.631-0.341,0.896-0.614c3.78-3.849,8.013-9.225,12.911-15.445 c10.385-13.201,23.313-29.628,37.589-38.69c0.452-0.29,0.742-0.717,1.118-1.067c0.256-0.239,0.597-0.35,0.828-0.631 c9.301-10.999,35.166-35.234,47.821-40.235C365.877,203.537,368.027,198.579,366.295,194.193"
                fill="#5ABA63"
              />
              <Path
                d="M426.628,346.044c0,7.415-6.007,13.423-13.423,13.423H98.718c-7.415,0-13.423-6.008-13.423-13.423 v-7.296c0-7.407,6.007-13.414,13.423-13.414h314.487c7.415,0,13.423,6.007,13.423,13.414V346.044z"
                fill="#7F5B53"
              />
              <Polygon
                points="349.828,504.531 162.095,504.531 110.895,359.464 401.028,359.464"
                fill="#AF8066"
              />
              <Path
                d="M369.565,448.61l-16.631-9.634c-6.972-4.181-15.821-3.499-22.059,1.707l-12.979,10.812 c-7.049,5.879-15.676,9.967-24.849,10.351c-8.704,0.367-16.512-2.099-20.924-7.407l-33.229-35.243 c-10.129-10.129-18.313-10.624-33.314-4.437c-8.815,3.635-16.384,12.971-26.419,12.971c-12.134,0-20.83-4.557-25.6-8.533 l-31.13-27.051l39.663,112.384h187.733L369.565,448.61z"
                fill="#D9AA94"
              />
              <Path
                d="M409.562,513.064H93.828c-4.71,0-8.533-3.823-8.533-8.533s3.823-8.533,8.533-8.533h315.733 c4.71,0,8.533,3.823,8.533,8.533S414.272,513.064,409.562,513.064"
                fill="#7F5B53"
              />
            </G>
          </Svg>
        </View>
      ),
      label: "Own business",
    },
    {
      id: 5,
      icon: (
        <View>
          <Svg viewBox="0 0 64 64" width={64} height={54}>
            <Defs></Defs>
            <G>
              <Path
                fill="#748a95"
                d="M33.35,52V46.56h7.73a2.09,2.09,0,0,1,2.12,2.13V52h2.69V48.69a4.83,4.83,0,0,0-4.81-4.82H33.35V40h-2.7v3.91H22.92a4.84,4.84,0,0,0-4.82,4.82V52h2.7V48.69a2.09,2.09,0,0,1,2.12-2.13h7.73V52Z"
              />
              <Path
                fill="#617880"
                d="M34.46,36.7v3.45a1.11,1.11,0,0,1-1.11,1.11h-2.7a1.1,1.1,0,0,1-1.11-1.11V36.7L32,35.24Z"
              />
              <Path
                fill="#d0e1e8"
                d="M45.17,32.47l2.65-4.59a2,2,0,0,0-.72-2.67l-1-.6a2.27,2.27,0,0,0-.54-.22,2,2,0,0,0-2.13.93L40.12,31a1.82,1.82,0,0,0-.25.73l-1.11,2.73,2.88.19Z"
              />
              <Path
                fill="#d0e1e8"
                d="M18.83,32.47l-2.65-4.59a2,2,0,0,1,.72-2.67l1-.6a2,2,0,0,1,2.67.71L23.88,31a1.82,1.82,0,0,1,.25.73l.93,1.9-1.26.45Z"
              />
              <Path
                fill="#f0f4f7"
                d="M22.89,52.56a3.44,3.44,0,1,1-3.44-3.44A3.44,3.44,0,0,1,22.89,52.56Z"
              />
              <Path
                fill="#f0f4f7"
                d="M35.44,52.56A3.44,3.44,0,1,1,32,49.12,3.44,3.44,0,0,1,35.44,52.56Z"
              />
              <Path
                fill="#f0f4f7"
                d="M48,52.56a3.44,3.44,0,1,1-3.44-3.44A3.44,3.44,0,0,1,48,52.56Z"
              />
              <Path
                fill="#617880"
                d="M33.74,25.2v6.53l-2.05,2.09-2.06-2.09V25.2l2.06-2.09Z"
              />
              <Path
                fill="#94d8e5"
                d="M23.65,8h16.7a3.12,3.12,0,0,1,3.13,3.12v11a3.13,3.13,0,0,1-3.13,3.13H23.65a3.13,3.13,0,0,1-3.13-3.13v-11A3.12,3.12,0,0,1,23.65,8Z"
              />
              {/* Add other Paths with respective classes */}
            </G>
          </Svg>
        </View>
      ),
      label: "Freelance work",
    },
    {
      id: 6,
      icon: (
        <View>
          <Svg viewBox="0 0 64 64" width={64} height={54}>
            <Defs></Defs>
            <G>
              <Path
                fill="#748a95"
                d="M33.35,52V46.56h7.73a2.09,2.09,0,0,1,2.12,2.13V52h2.69V48.69a4.83,4.83,0,0,0-4.81-4.82H33.35V40h-2.7v3.91H22.92a4.84,4.84,0,0,0-4.82,4.82V52h2.7V48.69a2.09,2.09,0,0,1,2.12-2.13h7.73V52Z"
              />
              <Path
                fill="#617880"
                d="M34.46,36.7v3.45a1.11,1.11,0,0,1-1.11,1.11h-2.7a1.1,1.1,0,0,1-1.11-1.11V36.7L32,35.24Z"
              />
              <Path
                fill="#d0e1e8"
                d="M45.17,32.47l2.65-4.59a2,2,0,0,0-.72-2.67l-1-.6a2.27,2.27,0,0,0-.54-.22,2,2,0,0,0-2.13.93L40.12,31a1.82,1.82,0,0,0-.25.73l-1.11,2.73,2.88.19Z"
              />
              <Path
                fill="#d0e1e8"
                d="M18.83,32.47l-2.65-4.59a2,2,0,0,1,.72-2.67l1-.6a2,2,0,0,1,2.67.71L23.88,31a1.82,1.82,0,0,1,.25.73l.93,1.9-1.26.45Z"
              />
              <Path
                fill="#f0f4f7"
                d="M22.89,52.56a3.44,3.44,0,1,1-3.44-3.44A3.44,3.44,0,0,1,22.89,52.56Z"
              />
              <Path
                fill="#f0f4f7"
                d="M35.44,52.56A3.44,3.44,0,1,1,32,49.12,3.44,3.44,0,0,1,35.44,52.56Z"
              />
              <Path
                fill="#f0f4f7"
                d="M48,52.56a3.44,3.44,0,1,1-3.44-3.44A3.44,3.44,0,0,1,48,52.56Z"
              />
              <Path
                fill="#617880"
                d="M33.74,25.2v6.53l-2.05,2.09-2.06-2.09V25.2l2.06-2.09Z"
              />
              <Path
                fill="#94d8e5"
                d="M23.65,8h16.7a3.12,3.12,0,0,1,3.13,3.12v11a3.13,3.13,0,0,1-3.13,3.13H23.65a3.13,3.13,0,0,1-3.13-3.13v-11A3.12,3.12,0,0,1,23.65,8Z"
              />
            </G>
          </Svg>
        </View>
      ),
      label: "Other interests",
    },
    {
      id: 7,
      icon: (
        <View>
          <Svg viewBox="0 0 64 64" width={64} height={54}>
            <Defs></Defs>
            <G>
              <Path
                fill="#748a95"
                d="M33.35,52V46.56h7.73a2.09,2.09,0,0,1,2.12,2.13V52h2.69V48.69a4.83,4.83,0,0,0-4.81-4.82H33.35V40h-2.7v3.91H22.92a4.84,4.84,0,0,0-4.82,4.82V52h2.7V48.69a2.09,2.09,0,0,1,2.12-2.13h7.73V52Z"
              />
              <Path
                fill="#617880"
                d="M34.46,36.7v3.45a1.11,1.11,0,0,1-1.11,1.11h-2.7a1.1,1.1,0,0,1-1.11-1.11V36.7L32,35.24Z"
              />
              <Path
                fill="#d0e1e8"
                d="M45.17,32.47l2.65-4.59a2,2,0,0,0-.72-2.67l-1-.6a2.27,2.27,0,0,0-.54-.22,2,2,0,0,0-2.13.93L40.12,31a1.82,1.82,0,0,0-.25.73l-1.11,2.73,2.88.19Z"
              />
              <Path
                fill="#d0e1e8"
                d="M18.83,32.47l-2.65-4.59a2,2,0,0,1,.72-2.67l1-.6a2,2,0,0,1,2.67.71L23.88,31a1.82,1.82,0,0,1,.25.73l.93,1.9-1.26.45Z"
              />
              <Path
                fill="#f0f4f7"
                d="M22.89,52.56a3.44,3.44,0,1,1-3.44-3.44A3.44,3.44,0,0,1,22.89,52.56Z"
              />
              <Path
                fill="#f0f4f7"
                d="M35.44,52.56A3.44,3.44,0,1,1,32,49.12,3.44,3.44,0,0,1,35.44,52.56Z"
              />
              <Path
                fill="#f0f4f7"
                d="M48,52.56a3.44,3.44,0,1,1-3.44-3.44A3.44,3.44,0,0,1,48,52.56Z"
              />
              <Path
                fill="#617880"
                d="M33.74,25.2v6.53l-2.05,2.09-2.06-2.09V25.2l2.06-2.09Z"
              />
              <Path
                fill="#94d8e5"
                d="M23.65,8h16.7a3.12,3.12,0,0,1,3.13,3.12v11a3.13,3.13,0,0,1-3.13,3.13H23.65a3.13,3.13,0,0,1-3.13-3.13v-11A3.12,3.12,0,0,1,23.65,8Z"
              />
            </G>
          </Svg>
        </View>
      ),
      label: "Full-time job",
    },
  ];

  const handleOptionPress = (optionId: number) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(optionId)
        ? prevOptions.filter((id) => id !== optionId)
        : [...prevOptions, optionId]
    );
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {/* Progress Indicator */}
        <View style={styles.progress}>
          <View style={styles.activeDot}></View>
          <View style={styles.inactiveDot}></View>
          <View style={styles.inactiveDot}></View>
        </View>

        {/* Skip button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate("WelcomeScreen")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title and description */}
      <Text style={styles.title}>What brings you to Picsart?</Text>
      <Text style={styles.description}>
        This helps us prioritize relevant tools. Select all that apply.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Options list */}
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOptions.includes(option.id) && styles.selectedOption,
            ]}
            onPress={() => handleOptionPress(option.id)}
          >
            {option.icon}
            <View>
              <Text
                style={[
                  styles.optionText,
                  selectedOptions.includes(option.id) &&
                    styles.selectedOptionTxt,
                ]}
              >
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          selectedOptions.length > 0 ? styles.nextButtonActive : {},
        ]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  progress: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    justifyContent: "center",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c870f0",
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d3d3d3",
  },
  skipButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
  },
  skipText: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#E3D7F5",
    gap: 10,
  },
  selectedOption: {
    backgroundColor: "#c870f0",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "800",
  },
  selectedOptionTxt: {
    color: "#fff",
  },
  nextButton: {
    marginVertical: 25,
    paddingVertical: 15,
    borderRadius: 35,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
  },
  nextText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
  nextButtonActive: {
    backgroundColor: "#FF00FF",
  },
});

export default InterestsScreen;
