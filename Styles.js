import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';








export const PRIMARY_COLOR = '#8A2BE2'; 
export const SECONDARY_COLOR = '#2CB67D'; 
export const BG_COLOR = '#16161a';      
export const CARD_BG = '#242629';      
export const TEXT_LIGHT = '#fffffe';    
export const TEXT_MUTED = '#94a1b2';    
export const ACCENT_COLOR = '#ef4565';  

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_COLOR },
  container: { flex: 1, backgroundColor: BG_COLOR },
  contentContainer: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  appHeader: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
      paddingBottom: 15,
  },
  appTitle: { fontSize: 32, fontWeight: '900', color: TEXT_LIGHT, letterSpacing: -1 },
  headerIcon: {
      width: 44, height: 44, borderRadius: 22,
      backgroundColor: CARD_BG, justifyContent: 'center', alignItems: 'center',
      borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)'
  },

  searchContainer: { paddingHorizontal: 24, marginBottom: 30, marginTop: 10 },
  searchWrapper: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: CARD_BG,
      borderRadius: 16, paddingHorizontal: 18, height: 56,
      shadowColor: "#000", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 17, color: TEXT_LIGHT, height: '100%', fontWeight: '500' },

  bannerCarousel: { paddingLeft: 24, marginBottom: 35 },
  bannerCard: {
      width: width * 0.8, height: 180, marginRight: 15, borderRadius: 24, padding: 24,
      justifyContent: 'space-between',
      shadowColor: PRIMARY_COLOR, shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10
  },
  bannerBadge: { backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  bannerBadgeText: { color: TEXT_LIGHT, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  bannerTitle: { color: TEXT_LIGHT, fontSize: 26, fontWeight: '800', width: '80%' },
  bannerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: TEXT_LIGHT },
  seeAllBtn: { paddingVertical: 6, paddingHorizontal: 12 },
  seeAllText: { color: PRIMARY_COLOR, fontSize: 14, fontWeight: '700' },

  smallCardGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 },
  smallCard: {
      width: (width - 32) / 2 - 10, margin: 5,
      backgroundColor: CARD_BG, borderRadius: 20, padding: 12,
      shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2
  },
  smallCardArtwork: { width: '100%', aspectRatio: 1, borderRadius: 16, marginBottom: 12, backgroundColor: '#333' },
  smallCardTitle: { color: TEXT_LIGHT, fontSize: 15, fontWeight: '700', marginBottom: 2, paddingHorizontal: 4 },
  smallCardArtist: { color: TEXT_MUTED, fontSize: 13, paddingHorizontal: 4 },

  // --- LIST ITEM
  listItem: {
      flexDirection: 'row', alignItems: 'center',
      paddingVertical: 12, paddingHorizontal: 24,
      marginBottom: 8, borderRadius: 16,
  },
  listItemArtwork: { width: 64, height: 64, borderRadius: 16, marginRight: 16, backgroundColor: '#333' },
  listItemInfo: { flex: 1, justifyContent: 'center' },
  listItemTitle: { color: TEXT_LIGHT, fontSize: 17, fontWeight: '700', marginBottom: 4 },
  listItemArtist: { color: TEXT_MUTED, fontSize: 14, fontWeight: '500' },

  // --- LIBRARY SCREEN ---
  libraryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 50 : 20, marginBottom: 20 },
  libraryTitle: { fontSize: 34, fontWeight: '900', color: TEXT_LIGHT },
  libItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: CARD_BG, padding: 16, borderRadius: 20, marginBottom: 12, marginHorizontal: 24 },
  libItemIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },

  // --- PLAYER SCREEN ---
  playerContainer: { flex: 1, backgroundColor: BG_COLOR },
  playerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 50 : 10, marginBottom: 20 },
  playerTitleText: { color: TEXT_LIGHT, fontSize: 16, fontWeight: '700' },
  artworkContainer: { alignItems: 'center', justifyContent: 'center', flex: 1, maxHeight: width - 48 },
  artworkBig: {
      width: width - 64, height: width - 64, borderRadius: 32,
      shadowColor: '#000', shadowOffset: {width: 0, height: 20}, shadowOpacity: 0.4, shadowRadius: 30,
  },
  lyricsBox: { backgroundColor: CARD_BG, padding: 20, overflow: 'hidden' },
  lyricsText: { fontSize: 18, color: TEXT_MUTED, marginVertical: 10, textAlign: 'center' },
  activeLyrics: { color: TEXT_LIGHT, fontWeight: 'bold', fontSize: 22 },
  trackInfoContainer: { paddingHorizontal: 30, marginBottom: 30, marginTop: 30 },
  trackTitleBig: { fontSize: 28, fontWeight: '900', color: TEXT_LIGHT, textAlign: 'center', marginBottom: 8 },
  trackArtistBig: { fontSize: 18, color: TEXT_MUTED, textAlign: 'center', fontWeight: '500' },
  progressBar: { width: '100%', paddingHorizontal: 30, marginBottom: 10 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -8, paddingHorizontal: 30 },
  timeText: { color: TEXT_MUTED, fontSize: 13, fontWeight: '600' },
  controls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 50, marginBottom: 50, marginTop: 20 },
  playButtonBig: {
      width: 80, height: 80, borderRadius: 40,
      backgroundColor: PRIMARY_COLOR,
      justifyContent: 'center', alignItems: 'center',
      shadowColor: PRIMARY_COLOR, shadowOffset: {width:0,height:0}, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10
  },

  volumeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 40,
      marginBottom: 20,
  },
  volumeSlider: {
      flex: 1,
      marginHorizontal: 10,
  },
 
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: CARD_BG, borderRadius: 30, padding: 25 },
  modalTitle: { color: TEXT_LIGHT, fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  modalOptionText: { color: TEXT_LIGHT, fontSize: 18, marginLeft: 15, fontWeight: '600' },
  modalInput: {
      backgroundColor: BG_COLOR,
      color: TEXT_LIGHT,
      padding: 15,
      borderRadius: 12,
      fontSize: 16,
      marginBottom: 20
  },
  modalButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
  },
  modalButton: {
      flex: 1,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
  },
  modalButtonText: {
      color: TEXT_LIGHT,
      fontSize: 16,
      fontWeight: 'bold'
  }
});