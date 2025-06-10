import BottomSheetScreenContainer from "@/components/BottomSheetScreens/sheetComponents/BottomSheetScreenContainer";
import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Modal() {
  const handleClose = () => {
    router.back();
  };
  const data = [
    { id: "1", title: "Component 1", color: "#FF6B6B" },
    { id: "2", title: "Component 2", color: "#4ECDC4" },
    { id: "3", title: "Component 3", color: "#45B7D1" },
    { id: "4", title: "Component 4", color: "#96CEB4" },
  ];
  const renderHorizontalItem = ({ item }: any) => (
    <View style={[styles.horizontalItem, { backgroundColor: item.color }]}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
  return (
    <BottomSheetScreenContainer>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Modal Two</Text>
        <View style={styles.separator} />
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalScrollContent}
          renderItem={renderHorizontalItem}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />} // Custom spacing
          getItemLayout={(data, index) => ({
            length: 162,
            offset: 162 * index,
            index,
          })} // Performance boost
          initialNumToRender={4} // How many to render initially
          maxToRenderPerBatch={2} // Batch size for rendering
        />
        <Text>This content can scroll if it gets too long...</Text>
        <Text>Add more content here...</Text>
        <Text>
          And more... Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Praesentium, asperiores ipsam autem placeat qui expedita sit mollitia
          amet illum. Ea mollitia quia laboriosam quod blanditiis necessitatibus
          saepe harum architecto quisquam, incidunt magnam soluta. Consequuntur
          laudantium fuga cum magni dolor a eligendi sunt corporis fugiat esse
          repudiandae, sit dolorem at alias voluptate quam illum sapiente
          aliquid iste voluptatum quo hic? Dolorem molestiae similique soluta
          rerum ipsum amet itaque praesentium non, debitis quae dolore
          reprehenderit in autem dignissimos sit nesciunt eveniet hic labore
          laborum recusandae unde veniam beatae aperiam? Fugiat neque dolores
          eveniet est ipsa! Amet sint in adipisci dolore dolor molestias,
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.pressable} onPress={handleClose}>
          <Text>Button stuff</Text>
        </Pressable>
      </View>
    </BottomSheetScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  horizontalItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
  },
  horizontalScrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  footer: {
    padding: 16,
  },
  pressable: {
    padding: 16,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
