import AvatarComponent from "@/components/ui/AvatarComponent";
import BadgeComponent from "@/components/ui/BadgeComponent";
import CardComponent from "@/components/ui/CardComponent";
import IconComponent from "@/components/ui/IconComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { Colors } from "@/constants/Colors";
import { scale, vScale } from "@/constants/mixins";
import { heightToDp, SPACING } from "@/constants/responsive";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ScrollViewComponent from "../ui/ScrollViewComponent";

export default function CardExample() {
  return (
    <SafeAreaViewComponent withEdges={false}>
      <ScrollViewComponent
        style={PresetStyles.screenContainer}
        contentContainerStyle={{ paddingBottom: vScale(20) }}
      >
        <TextComponent size="lg" weight="bold" style={styles.title}>
          Card Examples
        </TextComponent>

        {/* Basic Card */}
        <TextComponent size="base" weight="medium" style={styles.sectionTitle}>
          Basic Card
        </TextComponent>
        <CardComponent style={[PresetStyles.card, { borderWidth: 0 }]}>
          <TextComponent>This is a basic card component</TextComponent>
        </CardComponent>

        {/* Product Card */}
        <TextComponent size="base" weight="medium" style={styles.sectionTitle}>
          Product Card
        </TextComponent>
        <CardComponent style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            }}
            style={styles.productImage}
          />
          <View style={styles.productContent}>
            <View style={styles.productHeader}>
              <TextComponent size="lg" weight="bold">
                Smart Watch
              </TextComponent>
              <BadgeComponent
                content="New"
                backgroundColor={Colors.light.primary}
              />
            </View>
            <TextComponent
              color={Colors.light.gray}
              style={styles.productDescription}
            >
              Latest model with health tracking features
            </TextComponent>
            <View style={styles.productFooter}>
              <TextComponent size="lg" weight="bold" color={Colors.light.tint}>
                $299.99
              </TextComponent>
              <IconComponent
                name="heart-outline"
                library="Ionicons"
                size={scale(24)}
              />
            </View>
          </View>
        </CardComponent>

        {/* Profile Card */}
        <TextComponent size="base" weight="medium" style={styles.sectionTitle}>
          Profile Card
        </TextComponent>
        <CardComponent style={styles.card}>
          <View style={styles.profileHeader}>
            <AvatarComponent
              size={scale(40)}
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              }}
            />
            <View style={styles.profileInfo}>
              <TextComponent size="lg" weight="bold">
                Sarah Johnson
              </TextComponent>
              <TextComponent color={Colors.light.gray}>
                Product Designer
              </TextComponent>
            </View>
          </View>
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <TextComponent size="lg" weight="bold">
                245
              </TextComponent>
              <TextComponent color={Colors.light.gray}>Posts</TextComponent>
            </View>
            <View style={styles.statItem}>
              <TextComponent size="lg" weight="bold">
                12.5K
              </TextComponent>
              <TextComponent color={Colors.light.gray}>Followers</TextComponent>
            </View>
            <View style={styles.statItem}>
              <TextComponent size="lg" weight="bold">
                1.2K
              </TextComponent>
              <TextComponent color={Colors.light.gray}>Following</TextComponent>
            </View>
          </View>
        </CardComponent>

        {/* Blog Post Card */}
        <TextComponent size="base" weight="medium" style={styles.sectionTitle}>
          Blog Post Card
        </TextComponent>
        <CardComponent style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
            }}
            style={styles.blogImage}
          />
          <View style={styles.blogContent}>
            <TextComponent size="lg" weight="bold">
              The Future of Technology
            </TextComponent>
            <TextComponent
              color={Colors.light.gray}
              style={styles.blogDescription}
            >
              Exploring the latest trends in AI and machine learning...
            </TextComponent>
            <View style={styles.blogFooter}>
              <View style={styles.blogAuthor}>
                <AvatarComponent
                  size={scale(40)}
                  source={{
                    uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                  }}
                />
                <TextComponent style={styles.authorName}>
                  John Doe
                </TextComponent>
              </View>
              <TextComponent color={Colors.light.gray}>
                5 min read
              </TextComponent>
            </View>
          </View>
        </CardComponent>

        {/* Event Card */}
        <TextComponent size="base" weight="medium" style={styles.sectionTitle}>
          Event Card
        </TextComponent>
        <CardComponent style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
            }}
            style={styles.eventImage}
          />
          <View style={styles.eventContent}>
            <BadgeComponent
              content="Upcoming"
              backgroundColor={Colors.light.Alert}
            />
            <TextComponent size="lg" weight="bold" style={styles.eventTitle}>
              Tech Conference 2024
            </TextComponent>
            <View style={styles.eventDetails}>
              <IconComponent
                name="calendar"
                library="Ionicons"
                size={scale(16)}
              />
              <TextComponent>March 15, 2024</TextComponent>
            </View>
            <View style={styles.eventDetails}>
              <IconComponent
                name="location"
                library="Ionicons"
                size={scale(16)}
              />
              <TextComponent>San Francisco, CA</TextComponent>
            </View>
            <View style={styles.eventFooter}>
              <TextComponent color={Colors.light.gray}>
                120 attendees
              </TextComponent>
              <IconComponent
                name="arrow-forward"
                library="Ionicons"
                size={scale(20)}
              />
            </View>
          </View>
        </CardComponent>
      </ScrollViewComponent>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: vScale(24),
  },
  sectionTitle: {
    marginTop: vScale(24),
    marginBottom: vScale(12),
  },
  card: {
    marginBottom: vScale(16),
    padding: SPACING,
    backgroundColor: Colors.light.white,
    borderRadius: scale(8),
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: heightToDp("25%"),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  productContent: {
    padding: SPACING,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vScale(8),
  },
  productDescription: {
    marginBottom: vScale(12),
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING,
  },
  profileInfo: {
    marginLeft: scale(16),
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: SPACING,
    borderTopWidth: 1,
    borderTopColor: Colors.light.lighBlueBg,
  },
  statItem: {
    alignItems: "center",
  },
  blogImage: {
    width: "100%",
    height: heightToDp("25%"),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  blogContent: {
    padding: SPACING,
  },
  blogDescription: {
    marginVertical: vScale(8),
  },
  blogFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: vScale(12),
  },
  blogAuthor: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorName: {
    marginLeft: scale(8),
  },
  eventImage: {
    width: "100%",
    height: heightToDp("20%"),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  eventContent: {
    padding: SPACING,
  },
  eventTitle: {
    marginTop: vScale(8),
    marginBottom: vScale(12),
  },
  eventDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vScale(8),
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: vScale(12),
  },
});
