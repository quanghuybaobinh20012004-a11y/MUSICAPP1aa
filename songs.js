// Danh sách 20 bài hát mẫu (MP3 HOẠT ĐỘNG, CÓ category)
const songs = [
  {
    id: '1',
    title: 'Sunny Day',
    artist: 'Bensound',
    album: 'Acoustic Vibes',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/1/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
    lyrics: []
  },
  {
    id: '2',
    title: 'A New Beginning',
    artist: 'Bensound',
    album: 'Cinematic',
    category: 'top',
    artwork: 'https://picsum.photos/seed/2/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3',
    lyrics: []
  },
  {
    id: '3',
    title: 'Energy',
    artist: 'Bensound',
    album: 'Pop Rock',
    category: 'top',
    artwork: 'https://picsum.photos/seed/3/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
    lyrics: []
  },
  {
    id: '4',
    title: 'Memories',
    artist: 'Bensound',
    album: 'Relax',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/4/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
    lyrics: []
  },
  {
    id: '5',
    title: 'Going Higher',
    artist: 'Bensound',
    album: 'Electronic',
    category: 'top',
    artwork: 'https://picsum.photos/seed/5/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-goinghigher.mp3',
    lyrics: []
  },
  {
    id: '6',
    title: 'Jazzy Frenchy',
    artist: 'Bensound',
    album: 'Jazz',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/6/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3',
    lyrics: []
  },
  {
    id: '7',
    title: 'Adventure',
    artist: 'Bensound',
    album: 'Epic',
    category: 'top',
    artwork: 'https://picsum.photos/seed/7/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-adventure.mp3',
    lyrics: []
  },
  {
    id: '8',
    title: 'Better Days',
    artist: 'Bensound',
    album: 'Acoustic',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/8/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-betterdays.mp3',
    lyrics: []
  },
  {
    id: '9',
    title: 'Once Again',
    artist: 'Bensound',
    album: 'Piano',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/9/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-onceagain.mp3',
    lyrics: []
  },
  {
    id: '10',
    title: 'Epic',
    artist: 'Bensound',
    album: 'Soundtrack',
    category: 'top',
    artwork: 'https://picsum.photos/seed/10/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-epic.mp3',
    lyrics: []
  },
  {
    id: '11',
    title: 'Relaxing',
    artist: 'Bensound',
    album: 'Ambient',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/11/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
    lyrics: []
  },
  {
    id: '12',
    title: 'Tenderness',
    artist: 'Bensound',
    album: 'Romantic',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/12/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
    lyrics: []
  },
  {
    id: '13',
    title: 'Dreams',
    artist: 'Bensound',
    album: 'Ambient',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/13/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-dreams.mp3',
    lyrics: []
  },
  {
    id: '14',
    title: 'Smile',
    artist: 'Bensound',
    album: 'Happy',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/14/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-smile.mp3',
    lyrics: []
  },
  {
    id: '15',
    title: 'Creative Minds',
    artist: 'Bensound',
    album: 'Corporate',
    category: 'top',
    artwork: 'https://picsum.photos/seed/15/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
    lyrics: []
  },
  {
    id: '16',
    title: 'Dubstep',
    artist: 'Bensound',
    album: 'Electronic',
    category: 'top',
    artwork: 'https://picsum.photos/seed/16/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-dubstep.mp3',
    lyrics: []
  },
  {
    id: '17',
    title: 'Hip Jazz',
    artist: 'Bensound',
    album: 'Jazz',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/17/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-hipjazz.mp3',
    lyrics: []
  },
  {
    id: '18',
    title: 'Moose',
    artist: 'Bensound',
    album: 'Rock',
    category: 'top',
    artwork: 'https://picsum.photos/seed/18/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-moose.mp3',
    lyrics: []
  },
  {
    id: '19',
    title: 'Tomorrow',
    artist: 'Bensound',
    album: 'Cinematic',
    category: 'chill',
    artwork: 'https://picsum.photos/seed/19/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-tomorrow.mp3',
    lyrics: []
  },
  {
    id: '20',
    title: 'Extreme Action',
    artist: 'Bensound',
    album: 'Soundtrack',
    category: 'top',
    artwork: 'https://picsum.photos/seed/20/300/300',
    url: 'https://www.bensound.com/bensound-music/bensound-extremeaction.mp3',
    lyrics: []
  },
];

export default songs;
