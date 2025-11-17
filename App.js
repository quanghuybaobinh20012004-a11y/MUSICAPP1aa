import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, Share, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ACCENT_COLOR, BG_COLOR, CARD_BG, PRIMARY_COLOR, styles, TEXT_LIGHT, TEXT_MUTED } from './Styles';
import songs from './songs';














Audio.setAudioModeAsync({ staysActiveInBackground: true, playsInSilentModeIOS: true, shouldDuckAndroid: true, playThroughEarpieceAndroid: false });
const FAVORITES_KEY = '@music_app_favorites_final';
const PLAYLISTS_KEY = '@music_app_playlists_final';
const OFFLINE_SONGS_KEY = '@music_app_offline_final';
const HISTORY_KEY = '@music_app_history_final'; 
async function getFavorites() { try { const json = await AsyncStorage.getItem(FAVORITES_KEY); return json != null ? JSON.parse(json) : []; } catch(e) { console.error(e); return []; } }
async function saveFavorites(newFavs) { try { await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs)); } catch (e) { console.error(e); } }
async function getPlaylists() { try { const json = await AsyncStorage.getItem(PLAYLISTS_KEY); return json != null ? JSON.parse(json) : []; } catch(e) { console.error(e); return []; } }
async function savePlaylists(newPlaylists) { try { await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(newPlaylists)); } catch (e) { console.error(e); } }
async function getOfflineMap() { try { const json = await AsyncStorage.getItem(OFFLINE_SONGS_KEY); return json != null ? JSON.parse(json) : {}; } catch(e) { console.error(e); return {}; } }
async function saveOfflineMap(map) { try { await AsyncStorage.setItem(OFFLINE_SONGS_KEY, JSON.stringify(map)); } catch (e) { console.error(e); } }
async function getHistory() { try { const json = await AsyncStorage.getItem(HISTORY_KEY); return json != null ? JSON.parse(json) : []; } catch(e) { console.error(e); return []; } }
async function saveHistory(songId) { try { const currentHistory = await getHistory(); const filteredHistory = currentHistory.filter(id => id !== songId); const newHistory = [songId, ...filteredHistory].slice(0, 100); await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory)); } catch (e) { console.error("Lỗi lưu lịch sử:", e); } }
function formatTime(millis) { if (!millis || millis < 0) return '0:00'; const minutes = Math.floor(millis / 60000); const seconds = Math.floor((millis % 60000) / 1000); return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; }













// --- COMPONENTS ---
const SmallCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.smallCard} onPress={onPress} activeOpacity={0.7}>
    <Image source={{ uri: item.artwork }} style={styles.smallCardArtwork} />
    <View style={{flex:1}}>
        <Text style={styles.smallCardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.smallCardArtist} numberOfLines={1}>{item.artist}</Text>
    </View>
  </TouchableOpacity>
);
const ListItem = ({ item, onPress, onOptionPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress} activeOpacity={0.7}>
    <Image source={{ uri: item.artwork }} style={styles.listItemArtwork} />
    <View style={styles.listItemInfo}>
      <Text style={styles.listItemTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.listItemArtist} numberOfLines={1}>{item.artist}</Text>
    </View>
    {onOptionPress && <TouchableOpacity onPress={() => onOptionPress(item)} style={{padding:10}} hitSlop={{top:20,bottom:20,left:20,right:20}}><Ionicons name="ellipsis-vertical" size={20} color={TEXT_MUTED} /></TouchableOpacity>}
  </TouchableOpacity>
);
const LibraryCategoryItem = ({ name, icon, onPress }) => (
    <TouchableOpacity style={styles.libItem} onPress={onPress}>
        <View style={[styles.libItemIcon, {backgroundColor: CARD_BG}]}><Ionicons name={icon} size={28} color={TEXT_MUTED} /></View>
        <View><Text style={{color: TEXT_LIGHT, fontSize: 17, fontWeight: '600'}}>{name}</Text></View>
    </TouchableOpacity>
);








// --- HOME SCREEN ---
function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const filtered = songs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()));
  
  useFocusEffect(useCallback(() => {
      async function loadSuggestions() {
          const historyIds = await getHistory();
          if (historyIds.length > 0) {
              const historySongs = historyIds.slice(0, 6).map(id => songs.find(s => s.id === id)).filter(Boolean);
              setSuggestions(historySongs);
          } else {
              setSuggestions(songs.slice(0, 6));
          }
      }
      loadSuggestions();
  }, []));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
      <View style={[styles.container, styles.contentContainer]}>
        <View style={styles.appHeader}><Text style={styles.appTitle}>Aurora Music</Text><TouchableOpacity style={styles.headerIcon}><FontAwesome5 name="user" size={18} color={TEXT_LIGHT} /></TouchableOpacity></View>
        <View style={styles.searchContainer}><View style={styles.searchWrapper}><Ionicons name="search" size={20} color={TEXT_MUTED} /><TextInput style={styles.searchInput} placeholder="Bạn muốn nghe gì?" placeholderTextColor={TEXT_MUTED} value={search} onChangeText={setSearch} />{search.length>0&&<TouchableOpacity onPress={()=>setSearch('')}><Ionicons name="close" size={20} color={TEXT_MUTED}/></TouchableOpacity>}</View></View>
        {search.length > 0 ? (
          <FlatList data={filtered} keyExtractor={i=>i.id} renderItem={({item})=><ListItem item={item} onPress={()=>navigation.navigate('Player',{songs:filtered,initialIndex:songs.findIndex(s=>s.id===item.id)})} onOptionPress={() => {}} />} contentContainerStyle={{ paddingBottom: 100 }} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerCarousel}>
                 <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PlaylistDetail', { type: 'category', name: 'Chill Hits', filterValue: 'chill' })}>
                    <LinearGradient colors={['#8A2BE2', '#4B0082']} style={styles.bannerCard}><View style={styles.bannerBadge}><Text style={styles.bannerBadgeText}>FEATURED</Text></View><View><Text style={styles.bannerTitle}>Chill Hits</Text><Text style={styles.bannerSubtitle}>Thư giãn cuối tuần</Text></View></LinearGradient>
                 </TouchableOpacity>
                 <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PlaylistDetail', { type: 'category', name: 'Top BXH', filterValue: 'top' })}>
                    <LinearGradient colors={['#FF6B6B', '#EE5253']} style={styles.bannerCard}><View style={styles.bannerBadge}><Text style={styles.bannerBadgeText}>TRENDING</Text></View><View><Text style={styles.bannerTitle}>Top BXH</Text><Text style={styles.bannerSubtitle}>Nghe nhiều nhất</Text></View></LinearGradient>
                 </TouchableOpacity>
             </ScrollView>
             <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Gợi ý cho bạn</Text></View>
             <View style={styles.smallCardGrid}>{suggestions.map((item,idx)=><SmallCard key={item.id} item={item} onPress={()=>navigation.navigate('Player',{songs:suggestions,initialIndex:idx})} />)}</View>
             <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Mới phát hành</Text></View>
             <View>{songs.slice(6,15).map((item,idx)=><ListItem key={item.id} item={item} onPress={()=>navigation.navigate('Player',{songs:songs.slice(6,15),initialIndex:idx})} onOptionPress={() => {}} />)}</View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

function PlaylistsTab({ navigation }) {
    const [pls, setPls] = useState([]); const [favCount, setFavCount] = useState(0);
    useFocusEffect(useCallback(() => { let i = true; async function l() { const p = await getPlaylists(); const f = await getFavorites(); const v = songs.filter(s => f.includes(s.id)); if (i) { setPls(p); setFavCount(v.length); } } l(); return () => { i = false; }; }, []));
    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}>
            <TouchableOpacity style={styles.libItem} onPress={() => navigation.navigate('PlaylistDetail', { type: 'favorites', name: 'Bài hát đã thích' })}>
                <LinearGradient colors={[PRIMARY_COLOR, '#FF8888']} style={styles.libItemIcon}><Ionicons name="heart" size={28} color="white" /></LinearGradient>
                <View><Text style={{color:TEXT_LIGHT, fontSize:17, fontWeight:'600'}}>Bài hát đã thích</Text><Text style={{color:TEXT_MUTED, marginTop:4}}>Playlist • {favCount} bài hát</Text></View>
            </TouchableOpacity>
            {pls.map(p => (
                <TouchableOpacity key={p.id} style={styles.libItem} onPress={() => navigation.navigate('PlaylistDetail', { type: 'custom', name: p.name, playlistId: p.id })}>
                    <View style={[styles.libItemIcon,{backgroundColor:'#2A2A2A'}]}><MaterialCommunityIcons name="playlist-music" size={28} color={TEXT_MUTED} /></View>
                    <View><Text style={{color:TEXT_LIGHT, fontSize:17, fontWeight:'600'}}>{p.name}</Text><Text style={{color:TEXT_MUTED, marginTop:4}}>{p.songs.length} bài hát</Text></View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
function ArtistsTab({ navigation }) { const artists = [...new Set(songs.map(song => song.artist))]; return ( <FlatList style={styles.container} data={artists} keyExtractor={item => item} renderItem={({ item }) => ( <LibraryCategoryItem name={item} icon="person-outline" onPress={() => navigation.navigate('PlaylistDetail', { type: 'artist', name: item, filterValue: item })} /> )} contentContainerStyle={{paddingTop: 20, paddingBottom: 100}} /> ); }
function AlbumsTab({ navigation }) { const albums = [...new Set(songs.map(song => song.album))]; return ( <FlatList style={styles.container} data={albums} keyExtractor={item => item} renderItem={({ item }) => ( <LibraryCategoryItem name={item} icon="albums-outline" onPress={() => navigation.navigate('PlaylistDetail', { type: 'album', name: item, filterValue: item })} /> )} contentContainerStyle={{paddingTop: 20, paddingBottom: 100}} /> ); }
function HistoryTab({ navigation }) {
    const [historySongs, setHistorySongs] = useState([]);
    useFocusEffect(useCallback(() => {
        async function loadHistory() {
            const historyIds = await getHistory();
            const historyList = historyIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
            setHistorySongs(historyList);
        }
        loadHistory();
    }, []));
    return (
         <FlatList
            style={styles.container}
            data={historySongs}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
                <ListItem
                    item={item}
                    onPress={() => navigation.navigate('Player', { songs: historySongs, initialIndex: index })}
                    onOptionPress={() => {}}
                    showOptions={false}
                />
            )}
            ListEmptyComponent={<View style={styles.center}><Text style={{color:TEXT_MUTED, marginTop:100}}>Chưa có lịch sử nghe nhạc</Text></View>}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
        />
    );
}
const TopTab = createMaterialTopTabNavigator();

function LibraryScreen({ navigation }) {
    const [promptVisible, setPromptVisible] = useState(false); const [newPlName, setNewPlName] = useState("");
    async function handleCreatePlaylist() { if (newPlName && newPlName.trim()) { const pls = await getPlaylists(); const n = [...pls, {id:Date.now().toString(), name:newPlName.trim(), songs:[]}]; await savePlaylists(n); } setNewPlName(""); setPromptVisible(false); }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, styles.contentContainer]}>
                <View style={styles.libraryHeader}><Text style={styles.libraryTitle}>Thư viện</Text><TouchableOpacity onPress={() => setPromptVisible(true)} hitSlop={{top:20,bottom:20,left:20,right:20}}><Ionicons name="add-circle" size={38} color={PRIMARY_COLOR} /></TouchableOpacity></View>
                <TopTab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: TEXT_LIGHT,
                        tabBarInactiveTintColor: TEXT_MUTED,
                        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold', textTransform: 'none' },
                        tabBarIndicatorStyle: { backgroundColor: PRIMARY_COLOR, height: 3 },
                        tabBarStyle: { backgroundColor: BG_COLOR, elevation: 0, shadowOpacity: 0 },
                        tabBarScrollEnabled: true, 
                        tabBarItemStyle: { width: 'auto', paddingHorizontal: 15 }, 
                    }}
                >
                    <TopTab.Screen name="PlaylistsTab" component={PlaylistsTab} options={{ title: 'Playlists' }} />
                    <TopTab.Screen name="HistoryTab" component={HistoryTab} options={{ title: 'Nghe gần đây' }} />
                    <TopTab.Screen name="ArtistsTab" component={ArtistsTab} options={{ title: 'Nghệ sĩ' }} />
                    <TopTab.Screen name="AlbumsTab" component={AlbumsTab} options={{ title: 'Album' }} />
                </TopTab.Navigator>
            </View>
            <Modal transparent visible={promptVisible} animationType="fade" onRequestClose={() => setPromptVisible(false)}><TouchableOpacity style={styles.modalBg} activeOpacity={1} onPress={() => setPromptVisible(false)}><View style={styles.modalContent} onStartShouldSetResponder={() => true}><Text style={styles.modalTitle}>Tạo playlist mới</Text><TextInput style={styles.modalInput} placeholder="Nhập tên playlist..." placeholderTextColor={TEXT_MUTED} value={newPlName} onChangeText={setNewPlName} autoFocus={true} /><View style={styles.modalButtonRow}><TouchableOpacity style={[styles.modalButton, {backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 10}]} onPress={() => setPromptVisible(false)}><Text style={styles.modalButtonText}>Hủy</Text></TouchableOpacity><TouchableOpacity style={[styles.modalButton, {backgroundColor: PRIMARY_COLOR, marginLeft: 10}]} onPress={handleCreatePlaylist}><Text style={styles.modalButtonText}>Tạo</Text></TouchableOpacity></View></View></TouchableOpacity></Modal>
        </SafeAreaView>
    );
}

function PlaylistDetailScreen({ route, navigation }) {
    const { type, playlistId, name, filterValue } = route.params; const [list, setList] = useState([]); const [modal, setModal] = useState(false); const [sel, setSel] = useState(null);
    const loadSongs = useCallback(async () => {
        let loadedSongs = [];
        if (type === 'favorites') { const f = await getFavorites(); loadedSongs = f.map(id => songs.find(s => s.id === id)).filter(Boolean); } 
        else if (type === 'custom') { const p = (await getPlaylists()).find(x=>x.id===playlistId); if (p) loadedSongs = p.songs.map(id => songs.find(s => s.id === id)).filter(Boolean); }
        else if (type === 'artist') { loadedSongs = songs.filter(s => s.artist === filterValue); }
        else if (type === 'album') { loadedSongs = songs.filter(s => s.album === filterValue); }
        else if (type === 'category') { loadedSongs = songs.filter(s => s.category === filterValue); }
        setList(loadedSongs);
    }, [type, playlistId, filterValue]);
    useFocusEffect(useCallback(() => { loadSongs(); }, [loadSongs]));
    async function removeItem() { if (!sel || type === 'artist' || type === 'album' || type === 'category') { setModal(false); return; } if (type === 'favorites') { await saveFavorites((await getFavorites()).filter(id => id !== sel.id)); } else if (type === 'custom') { const pls = await getPlaylists(); await savePlaylists(pls.map(pl => pl.id === playlistId ? { ...pl, songs: pl.songs.filter(id => id !== sel.id) } : pl)); } loadSongs(); setModal(false); }
    const canDelete = type === 'favorites' || type === 'custom';

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, styles.contentContainer]}>
                <View style={{padding:20, paddingBottom:5}}><TouchableOpacity onPress={()=>navigation.goBack()} style={{marginBottom:15}} hitSlop={{top:20,bottom:20,left:20,right:20}}><Ionicons name="arrow-back" size={28} color={TEXT_LIGHT}/></TouchableOpacity><Text style={{color:PRIMARY_COLOR, fontSize:12, fontWeight:'700', letterSpacing:1, marginBottom:4}}>{type.toUpperCase()}</Text><Text style={{color:TEXT_LIGHT, fontSize:32, fontWeight:'800'}} numberOfLines={1}>{name}</Text></View>
                <FlatList data={list} keyExtractor={i=>i.id} renderItem={({item,index})=><ListItem item={item} onPress={()=>navigation.navigate('Player',{songs:list,initialIndex:index})} onOptionPress={canDelete ? (s)=>{setSel(s);setModal(true);} : null} showOptions={canDelete} />} ListEmptyComponent={<View style={styles.center}><Text style={{color:TEXT_MUTED, marginTop:100, fontSize:16}}>Danh sách trống.</Text></View>} contentContainerStyle={{paddingBottom:100}} />
            </View>
            <Modal transparent visible={modal} animationType="fade" onRequestClose={()=>setModal(false)}><TouchableOpacity style={styles.modalBg} activeOpacity={1} onPress={()=>setModal(false)}><View style={styles.modalContent} onStartShouldSetResponder={() => true}><Text style={styles.modalTitle} numberOfLines={1}>{sel?.title}</Text>{canDelete && (<TouchableOpacity style={styles.modalOption} onPress={removeItem}><Ionicons name="remove-circle-outline" size={24} color={ACCENT_COLOR}/><Text style={[styles.modalOptionText,{color:ACCENT_COLOR}]}>Xóa khỏi {name}</Text></TouchableOpacity>)}</View></TouchableOpacity></Modal>
        </SafeAreaView>
    );
}











function PlayerScreen({ route, navigation }) {
    const { songs: playlist, initialIndex } = route.params || {};
    if (!playlist || typeof initialIndex === 'undefined') { return ( <SafeAreaView style={[styles.safeArea, styles.center]}><Text style={{color: ACCENT_COLOR, fontSize: 18}}>Lỗi: Không tìm thấy bài hát.</Text><TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20}}><Text style={{color: TEXT_LIGHT, fontSize: 16}}>Quay lại</Text></TouchableOpacity></SafeAreaView> ); }
    const [idx, setIdx] = useState(initialIndex); const [sound, setSound] = useState(); const [playing, setPlaying] = useState(false); const [loading, setLoading] = useState(true); const [pos, setPos] = useState(0); const [dur, setDur] = useState(1); const [fav, setFav] = useState(false); const [shuffle, setShuffle] = useState(false); const [repeat, setRepeat] = useState(0); const [showLyrics, setShowLyrics] = useState(false);
    const [downed, setDowned] = useState(false); const [downing, setDowning] = useState(false); const [volume, setVolume] = useState(1.0); const [optionsModal, setOptionsModal] = useState(false); const [availablePls, setAvailablePls] = useState([]);
    const song = playlist[idx];
    if (!song) { return ( <SafeAreaView style={[styles.safeArea, styles.center]}><Text style={{color: ACCENT_COLOR, fontSize: 18}}>Lỗi: Bài hát không tồn tại.</Text><TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20}}><Text style={{color: TEXT_LIGHT, fontSize: 16}}>Quay lại</Text></TouchableOpacity></SafeAreaView> ); }
    const lyrics = song.lyrics || [];
    useEffect(() => { async function checkStatus() { const favs = await getFavorites(); setFav(favs.includes(song.id)); const map = await getOfflineMap(); if (map[song.id]) { const i = await FileSystem.getInfoAsync(map[song.id]); setDowned(i.exists); } else { setDowned(false); } } checkStatus(); }, [song]);
    async function toggleFav() { const f = await getFavorites(); await saveFavorites(fav ? f.filter(id => id !== song.id) : [...f, song.id]); setFav(!fav); }
    async function loadMusic() { setLoading(true); if (sound) await sound.unloadAsync(); let uri = song.url; const map = await getOfflineMap(); if (map[song.id]) { const i = await FileSystem.getInfoAsync(map[song.id]); if (i.exists) uri = map[song.id]; } try { const { sound: s } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true, volume: volume }); setSound(s); setPlaying(true); setLoading(false); saveHistory(song.id); s.setOnPlaybackStatusUpdate(st => { if (st.isLoaded) { setPos(st.positionMillis); setDur(st.durationMillis || 1); if (st.didJustFinish) next(true); } }); } catch (e) { setLoading(false); Alert.alert("Lỗi", "Không thể phát bài hát này. Link nhạc có thể đã hỏng."); } }
    useEffect(() => { loadMusic(); }, [idx]);
    useEffect(() => { return sound ? () => { sound.unloadAsync(); } : undefined; }, [sound]);
    async function pp() { if (sound) { playing ? await sound.pauseAsync() : await sound.playAsync(); setPlaying(!playing); } }
    async function seek(val) { if (sound) await sound.setPositionAsync(val); }
    function next(auto=false) { if(auto && repeat===2 && sound){sound.replayAsync();return;} if(shuffle){let n;do{n=Math.floor(Math.random()*playlist.length);}while(n===idx&&playlist.length>1);setIdx(n);return;} if(idx<playlist.length-1){setIdx(idx+1);}else if(repeat===1){setIdx(0);} }
    function prev() { if(idx>0)setIdx(idx-1);else setIdx(playlist.length-1); }
    async function download() {
        if(downed)return;
        setDowning(true);
        try {
            const d=FileSystem.documentDirectory+'m/';
            if(!(await FileSystem.getInfoAsync(d)).exists) await FileSystem.makeDirectoryAsync(d, { intermediates: true }); // Thêm intermediates
            const f=d+song.id+'.mp3';
            console.log("Downloading to:", f); 
            const result = await FileSystem.downloadAsync(song.url,f); 
            console.log("Download result:", result);
            
            const m=await getOfflineMap();
            m[song.id]=result.uri; 
            await saveOfflineMap(m);
            setDowned(true);
            Alert.alert("Đã tải xong");
        } catch(e) {
            console.error("Download Error:", e); 
            Alert.alert("Lỗi tải", e.message || "Không thể tải file"); 
            setDowning(false);
        }
    }
    async function handleVolume(val) { setVolume(val); if(sound) await sound.setVolumeAsync(val); }
    async function openOptionsModal() { setAvailablePls(await getPlaylists()); setOptionsModal(true); }
    async function addToPlaylist(playlistId) { const playlists = await getPlaylists(); const updatedPlaylists = playlists.map(pl => { if (pl.id === playlistId && !pl.songs.includes(song.id)) { return { ...pl, songs: [...pl.songs, song.id] }; } return pl; }); await savePlaylists(updatedPlaylists); Alert.alert("Thành công", `Đã thêm "${song.title}" vào playlist.`); setOptionsModal(false); }
    const curLine = lyrics.findLastIndex(l => pos >= l.time);

   
    async function handleShare() {
        setOptionsModal(false); 
        try {
            await Share.share({
                message: `Nghe bài hát này nhé: ${song.title} - ${song.artist}. \nLink bài hát: ${song.url}`,
                title: `Chia sẻ bài hát: ${song.title}`
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View style={styles.playerContainer}>
            <LinearGradient colors={[CARD_BG, BG_COLOR]} style={StyleSheet.absoluteFillObject} start={{x:0.5,y:0}} end={{x:0.5,y:0.7}} />
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.playerHeader}><TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top:20,bottom:20,left:20,right:20}}><Ionicons name="chevron-down" size={34} color={TEXT_LIGHT} /></TouchableOpacity><Text style={styles.playerTitleText}>ĐANG PHÁT</Text><TouchableOpacity onPress={openOptionsModal} hitSlop={{top:20,bottom:20,left:20,right:20}}><Ionicons name="ellipsis-horizontal" size={24} color={TEXT_LIGHT} /></TouchableOpacity></View>
                <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'space-evenly', paddingBottom:20}}>
                    <View style={styles.artworkContainer}>
                        {showLyrics ? (
                            <View style={[styles.artworkBig,{backgroundColor:CARD_BG,padding:20,overflow:'hidden'}]}><ScrollView showsVerticalScrollIndicator={false}>{lyrics.length>0?lyrics.map((l,i)=>(
                                <Text key={i} style={[styles.lyricsText, i===curLine && styles.activeLyrics]}>{l.text}</Text>
                            )):<Text style={styles.lyricsText}>Chưa có lời bài hát</Text>}</ScrollView></View>
                        ) : (<Image source={{ uri: song.artwork }} style={styles.artworkBig} />)}
                    </View>
                    <View style={{paddingHorizontal:30, marginBottom:10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{flex:1, marginRight:15}}><Text style={styles.trackTitleBig} numberOfLines={1}>{song.title}</Text><Text style={styles.trackArtistBig}>{song.artist}</Text></View>
                            <TouchableOpacity onPress={toggleFav}><Ionicons name={fav?"heart":"heart-outline"} size={30} color={fav?ACCENT_COLOR:TEXT_LIGHT}/></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.progressBar}><Slider style={{width:'100%', height:40}} minimumValue={0} maximumValue={dur} value={pos} minimumTrackTintColor={TEXT_LIGHT} maximumTrackTintColor="rgba(255,255,255,0.2)" thumbTintColor={TEXT_LIGHT} onSlidingComplete={seek} /><View style={styles.timeRow}><Text style={styles.timeText}>{formatTime(pos)}</Text><Text style={styles.timeText}>-{formatTime(dur-pos)}</Text></View></View>
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={()=>setShuffle(!shuffle)}><Ionicons name="shuffle" size={30} color={shuffle?PRIMARY_COLOR:TEXT_MUTED}/></TouchableOpacity>
                        <TouchableOpacity onPress={prev}><Ionicons name="play-skip-back" size={42} color={TEXT_LIGHT}/></TouchableOpacity>
                        <TouchableOpacity onPress={pp} style={styles.playButtonBig}>{loading?<ActivityIndicator color={BG_COLOR}/>:<Ionicons name={playing?"pause":"play"} size={40} color={BG_COLOR} style={{marginLeft:playing?0:5}}/>}</TouchableOpacity>
                        <TouchableOpacity onPress={()=>next(false)}><Ionicons name="play-skip-forward" size={42} color={TEXT_LIGHT}/></TouchableOpacity>
                        <TouchableOpacity onPress={()=>setRepeat((r)=>(r+1)%3)}><MaterialCommunityIcons name={repeat===1?"repeat-once":repeat===2?"repeat":"repeat-off"} size={30} color={repeat!==0?PRIMARY_COLOR:TEXT_MUTED}/></TouchableOpacity>
                    </View>
                    <View style={styles.volumeContainer}>
                        <Ionicons name="volume-low-outline" size={22} color={TEXT_MUTED} />
                        <Slider style={styles.volumeSlider} minimumValue={0} maximumValue={1} value={volume} onValueChange={handleVolume} minimumTrackTintColor={TEXT_MUTED} maximumTrackTintColor="rgba(255,255,255,0.1)" thumbTintColor={TEXT_MUTED} />
                        <Ionicons name="volume-high-outline" size={22} color={TEXT_MUTED} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Modal transparent visible={optionsModal} animationType="fade" onRequestClose={() => setOptionsModal(false)}>
                <TouchableOpacity style={styles.modalBg} activeOpacity={1} onPress={() => setOptionsModal(false)}>
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalTitle} numberOfLines={1}>{song.title}</Text>
                      
                        <TouchableOpacity style={styles.modalOption} onPress={handleShare}>
                            <Ionicons name="share-social-outline" size={24} color={TEXT_MUTED} />
                            <Text style={styles.modalOptionText}>Chia sẻ bài hát</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalOption} onPress={() => { setOptionsModal(false); setShowLyrics(true); }}>
                            <MaterialCommunityIcons name="lyrics" size={24} color={TEXT_MUTED} />
                            <Text style={styles.modalOptionText}>Lời bài hát</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={download}>
                            {downing ? <ActivityIndicator color={PRIMARY_COLOR} /> : <Feather name="download" size={24} color={downed ? PRIMARY_COLOR : TEXT_MUTED} />}
                            <Text style={[styles.modalOptionText, {color: downed ? PRIMARY_COLOR : TEXT_LIGHT}]}>{downed ? "Đã tải xuống" : "Tải xuống"}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.modalOptionText, {color: TEXT_MUTED, marginTop: 20, marginBottom: 10, fontSize: 16}]}>Thêm vào playlist...</Text>
                        <ScrollView style={{maxHeight: 150}}>
                            {availablePls.length > 0 ? availablePls.map(pl => (
                                <TouchableOpacity key={pl.id} style={styles.modalOption} onPress={() => addToPlaylist(pl.id)}>
                                    <MaterialCommunityIcons name="playlist-music-outline" size={24} color={TEXT_MUTED} />
                                    <Text style={styles.modalOptionText}>{pl.name}</Text>
                                </TouchableOpacity>
                            )) : <Text style={{color: TEXT_MUTED, textAlign: 'center', paddingVertical: 10}}>Chưa có playlist nào.</Text>}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

// --- MAIN NAVIGATION ---
const Stack = createNativeStackNavigator(); const Tab = createBottomTabNavigator();
function MainTab() { return (<Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color }) => { let n = route.name === 'HomeTab' ? 'compass' : 'library'; return <Ionicons name={focused ? n : `${n}-outline`} size={28} color={color} />; }, tabBarActiveTintColor: PRIMARY_COLOR, tabBarInactiveTintColor: TEXT_MUTED, tabBarStyle: { backgroundColor: BG_COLOR, borderTopWidth: 0, height: 70, paddingBottom: 15, paddingTop: 10, elevation:0 }, tabBarLabelStyle:{fontSize:11, fontWeight:'600'}, headerShown: false })}><Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Khám phá' }} /><Tab.Screen name="LibraryTab" component={LibraryScreen} options={{ title: 'Thư viện' }} /></Tab.Navigator>); }
export default function App() { return (<NavigationContainer><Stack.Navigator screenOptions={{headerShown: false}}><Stack.Screen name="Main" component={MainTab} /><Stack.Screen name="Player" component={PlayerScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} /><Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} options={({ route }) => ({ headerShown: true, title: '', headerStyle: {backgroundColor: BG_COLOR}, headerTintColor: TEXT_LIGHT, headerShadowVisible: false, headerTransparent: true, headerBackTitleVisible: false })} /></Stack.Navigator></NavigationContainer>); }