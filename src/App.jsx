import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Headphones,
  LibraryBig,
  LogIn,
  MapPin,
  MessageCircle,
  Music2,
  NotebookPen,
  Play,
  Plus,
  Send,
  Sparkles,
  Upload,
  UsersRound,
  Users,
  X,
} from 'lucide-react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'

const people = [
  {
    name: 'Αλέξανδρος', age: 21, subject: 'Πληροφορική', score: 92,
    distance: 'στο ίδιο campus', image: 'photo-1500648767791-00dcc994a43e',
    interests: ['Python', 'Ανταλλαγή σημειώσεων', 'Techno'],
    prompt: 'Ψάχνω ομάδα για το project τεχνητής νοημοσύνης.',
    activity: 'Ομαδικό διάβασμα', course: 'Αλγόριθμοι ΙΙ',
  },
  {
    name: 'Μαρία', age: 20, subject: 'Ψυχολογία', score: 89,
    distance: '2 λεπτά με τα πόδια', image: 'photo-1534528741775-53994a69daeb',
    interests: ['Σημειώσεις Ψυχολογίας', 'Yoga', 'Καφές'],
    prompt: 'Έχω οργανωμένες σημειώσεις για την κοινωνική ψυχολογία.',
    activity: 'Ανταλλαγή σημειώσεων', course: 'Κοινωνική Ψυχολογία',
  },
  {
    name: 'Νίκος', age: 22, subject: 'Μηχανολόγων', score: 86,
    distance: 'κοντά στη βιβλιοθήκη', image: 'photo-1506794778202-cad84cf45f1d',
    interests: ['Μουσική παραγωγή', 'Climbing', 'Design'],
    prompt: 'Στήνω μικρά jam sessions στην εστία. Φέρνεις όργανο;',
    activity: 'Μουσική στην εστία', course: 'Μηχανική Υλικών',
  },
  {
    name: 'Ελένη', age: 21, subject: 'Επικοινωνίας', score: 84,
    distance: 'στο ίδιο campus', image: 'photo-1524504388940-b1c1722653e1',
    interests: ['Εθελοντισμός', 'Film', 'Περιβάλλον'],
    prompt: 'Μαζευόμαστε για καθαρισμό πάρκου αυτό το Σάββατο.',
    activity: 'Εθελοντική ομάδα', course: 'Επικοινωνία & ΜΜΕ',
  },
  {
    name: 'Δημήτρης', age: 23, subject: 'Αρχιτεκτονική', score: 81,
    distance: '5 λεπτά με τα πόδια', image: 'photo-1507003211169-0a1dd7228f2d',
    interests: ['Φωτογραφία', 'Sketching', 'Πεζοπορία'],
    prompt: 'Κάνουμε βόλτα για φωτογραφίες και αρχιτεκτονικά σκίτσα.',
    activity: 'Campus photo walk', course: 'Αρχιτεκτονική Σύνθεση',
  },
  {
    name: 'Ιωάννα', age: 19, subject: 'Βιολογία', score: 88,
    distance: 'στο ίδιο campus', image: 'photo-1517841905240-472988babdf9',
    interests: ['Βιολογία', 'Flashcards', 'Matcha'],
    prompt: 'Μοιράζομαι flashcards για την κυτταρική βιολογία.',
    activity: 'Study group', course: 'Κυτταρική Βιολογία',
  },
  {
    name: 'Μάριος', age: 22, subject: 'Οικονομικών', score: 87,
    distance: 'κοντά στη βιβλιοθήκη', image: 'photo-1519085360753-af0119f7cbe7',
    interests: ['Excel', 'Basket', 'Hip-hop'],
    prompt: 'Οργανώνω παρέα για επανάληψη πριν την εξεταστική.',
    activity: 'Διάβασμα εξεταστικής', course: 'Μικροοικονομία',
  },
  {
    name: 'Σοφία', age: 20, subject: 'Νομική', score: 85,
    distance: '5 λεπτά με τα πόδια', image: 'photo-1531123897727-8f129e1688ce',
    interests: ['Νομική', 'Debate', 'Θέατρο'],
    prompt: 'Έχω περιλήψεις συνταγματικού δικαίου για ανταλλαγή.',
    activity: 'Ανταλλαγή σημειώσεων', course: 'Συνταγματικό Δίκαιο',
  },
  {
    name: 'Πέτρος', age: 21, subject: 'Μαθηματικό', score: 83,
    distance: 'στο ίδιο campus', image: 'photo-1501196354995-cbb51c65aaea',
    interests: ['Μαθηματικά', 'Σκάκι', 'Jazz'],
    prompt: 'Παίζουμε σκάκι στο κυλικείο μετά τις διαλέξεις.',
    activity: 'Σκάκι & καφές', course: 'Γραμμική Άλγεβρα',
  },
  {
    name: 'Δανάη', age: 23, subject: 'Παιδαγωγικό', score: 82,
    distance: 'κοντά στην πανεπιστημιούπολη', image: 'photo-1529139574466-a303027c1d8b',
    interests: ['Εθελοντισμός', 'Παιδιά', 'Μουσική'],
    prompt: 'Ψάχνουμε άτομα για δημιουργικά εργαστήρια σε παιδιά.',
    activity: 'Εθελοντισμός', course: 'Παιδαγωγική Ψυχολογία',
  },
  {
    name: 'Κατερίνα', age: 22, subject: 'Γραφιστική', score: 79,
    distance: 'στο ίδιο campus', image: 'photo-1524250502761-1ac6f2e30d43',
    interests: ['Illustration', 'Figma', 'Indie pop'],
    prompt: 'Φτιάχνουμε αφίσα για το φοιτητικό φεστιβάλ.',
    activity: 'Creative ομάδα', course: 'Οπτική Επικοινωνία',
  },
]

const navItems = [
  { id: 'discover', label: 'Ανακάλυψε', icon: Compass },
  { id: 'events', label: 'Events', icon: Music2 },
  { id: 'messages', label: 'Μηνύματα', icon: MessageCircle, badge: '2' },
  { id: 'profile', label: 'Προφίλ', icon: Users },
]

const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function ScoreBadge({ score }) {
  return (
    <div className="score-badge" aria-label={`Match Score: ${score}%`}>
      <span className="score-sparkle"><Sparkles size={13} strokeWidth={2.5} /></span>
      <span><strong>{score}%</strong><small>κοινά</small></span>
    </div>
  )
}

function ActivityIcon({ activity }) {
  if (activity.includes('σημειώσεων')) return <NotebookPen size={13} />
  if (activity.includes('Μουσική')) return <Headphones size={13} />
  return <UsersRound size={13} />
}

function ProfileCard({ person, index, dragX, onPointerDown, onPointerMove, onPointerUp, exiting }) {
  const isFront = index === 0
  const style = isFront
    ? {
        '--drag-x': `${dragX}px`,
        '--tilt': `${dragX * 0.035}deg`,
        transform: exiting ? undefined : 'translateX(var(--drag-x)) rotate(var(--tilt))',
        touchAction: 'pan-y',
      }
    : undefined

  return (
    <article
      className={`profile-card ${isFront ? 'profile-card-front' : 'profile-card-back'} ${exiting ? `card-exit card-exit-${exiting}` : ''}`}
      style={style}
      onPointerDown={isFront ? onPointerDown : undefined}
      onPointerMove={isFront ? onPointerMove : undefined}
      onPointerUp={isFront ? onPointerUp : undefined}
      onPointerCancel={isFront ? onPointerUp : undefined}
      aria-label={`${person.name}, ${person.age}, ${person.subject}`}
    >
      <img className="profile-photo" src={imageUrl(person.image)} alt={`Πορτρέτο του/της ${person.name}`} draggable="false" />
      <div className="photo-wash" />
      {isFront && (
        <>
          <div className="photo-topline">
            <span className="activity-pill"><ActivityIcon activity={person.activity} /> {person.activity}</span>
            <ScoreBadge score={person.score} />
          </div>
          <div className={`swipe-stamp ${dragX > 35 ? 'stamp-like' : ''} ${dragX < -35 ? 'stamp-pass' : ''}`}>
            {dragX > 35 ? 'ΣΤΗΝ ΟΜΑΔΑ!' : 'ΕΠΟΜΕΝΟ'}
          </div>
          <div className="profile-copy">
            <div className="location-line"><MapPin size={13} fill="currentColor" /> {person.distance}</div>
            <h2>{person.name}<span>, {person.age}</span></h2>
            <p className="profile-subject"><BookOpen size={14} /> {person.subject}</p>
            <p className="course-line"><NotebookPen size={12} /> {person.course}</p>
            <p className="profile-prompt">{person.prompt}</p>
            <div className="interest-list" aria-label="Ενδιαφέροντα">
              {person.interests.map((interest) => <span className="interest-chip" key={interest}>{interest}</span>)}
            </div>
          </div>
        </>
      )}
    </article>
  )
}

function MatchModal({ person, onClose, onMessage }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="match-modal" role="dialog" aria-modal="true" aria-labelledby="match-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close icon-button" onClick={onClose} aria-label="Κλείσιμο"><X size={19} /></button>
        <div className="match-confetti" aria-hidden="true"><span>✳</span><span>✦</span><span>✳</span></div>
        <div className="match-avatar-wrap">
          <img src={imageUrl(person.image, 240)} alt="" />
          <span><UsersRound size={16} /></span>
        </div>
        <p className="eyebrow">ΚΟΙΝΟ ΣΤΟ CAMPUS</p>
        <h2 id="match-title">Νέα γνωριμία!</h2>
        <p className="match-description">Εσύ και ο/η {person.name} έχετε κοινά στο {person.course}. Στείλε μήνυμα και οργανώστε την παρέα σας.</p>
        <button className="message-cta" onClick={onMessage}>Άνοιξε συνομιλία <ArrowRight size={17} /></button>
        <button className="keep-swiping" onClick={onClose}>Συνέχισε τις προτάσεις</button>
      </section>
    </div>
  )
}

function MessagesView({ connections, activeThread, onSelect, onBack, onSend, onDiscover }) {
  const [draft, setDraft] = useState('')
  const conversation = connections.find((person) => person.name === activeThread)

  if (conversation) {
    const send = (text) => {
      if (!text.trim()) return
      onSend(conversation.name, text.trim())
      setDraft('')
    }

    return (
      <section className="messages-view chat-view">
        <header className="chat-header">
          <button className="chat-back" onClick={onBack} aria-label="Πίσω στα μηνύματα"><ArrowLeft size={19} /></button>
          <img src={imageUrl(conversation.image, 120)} alt="" />
          <div><strong>{conversation.name}</strong><span>{conversation.activity} · {conversation.course}</span></div>
        </header>
        <div className="chat-scroll">
          {conversation.messages.length === 0 ? (
            <div className="chat-starter">
              <span className="starter-icon"><UsersRound size={22} /></span>
              <h2>Η γνωριμία ξεκινά εδώ</h2>
              <p>Έχετε κοινά στο {conversation.course}. Στείλε ένα μήνυμα για να οργανωθείτε.</p>
              <div className="starter-prompts">
                <button onClick={() => send('Έχεις σημειώσεις για το μάθημα;')}>Έχεις σημειώσεις για το μάθημα;</button>
                <button onClick={() => send('Πάμε για διάβασμα στη βιβλιοθήκη;')}>Πάμε για διάβασμα;</button>
                <button onClick={() => send('Τι ακούς τελευταία;')}>Τι ακούς τελευταία;</button>
              </div>
            </div>
          ) : (
            <div className="chat-messages">
              <div className="conversation-note"><NotebookPen size={13} /> Κοινό μάθημα: {conversation.course}</div>
              {conversation.messages.map((message, index) => (
                <p className={`chat-bubble ${message.from === 'me' ? 'chat-bubble-mine' : ''}`} key={`${index}-${message.text}`}>{message.text}</p>
              ))}
            </div>
          )}
        </div>
        <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); send(draft) }}>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Γράψε ένα μήνυμα..." aria-label="Μήνυμα" />
          <button type="submit" disabled={!draft.trim()} aria-label="Αποστολή"><Send size={17} /></button>
        </form>
      </section>
    )
  }

  return (
    <section className="messages-view">
      <div className="messages-heading"><p className="eyebrow">CAMPUS COMMUNITY</p><h1>Μηνύματα<span>.</span></h1></div>
      {connections.length === 0 ? (
        <div className="inbox-empty">
          <span><MessageCircle size={29} /></span>
          <h2>Οι συζητήσεις σου ξεκινούν εδώ.</h2>
          <p>Γνώρισε φοιτητές με κοινά μαθήματα, ανταλλάξτε σημειώσεις ή οργανώστε μια ομάδα.</p>
          <button className="message-cta" onClick={onDiscover}>Βρες την παρέα σου <ArrowRight size={17} /></button>
        </div>
      ) : (
        <div className="conversation-list">
          <p className="conversation-list-label">ΟΙ ΓΝΩΡΙΜΙΕΣ ΣΟΥ · {connections.length}</p>
          {connections.map((person) => {
            const lastMessage = person.messages.at(-1)?.text || `${person.activity} · ${person.course}`
            return (
              <button className="conversation-row" key={person.name} onClick={() => onSelect(person.name)}>
                <img src={imageUrl(person.image, 140)} alt="" />
                <span className="conversation-row-copy"><strong>{person.name}</strong><small>{lastMessage}</small></span>
                <ChevronRight size={17} />
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

const sampleParties = [
  { id: 'welcome', title: 'Welcome Back Rooftop', type: 'Φοιτητικό πάρτι', day: 'Παρασκευή 30 Οκτ.', time: '21:00', place: 'Ρομάντσο', attendees: 48, lat: 37.9842, lng: 23.7281, color: '#ed775d' },
  { id: 'campus', title: 'Campus Jam Session', type: 'Live μουσική', day: 'Σάββατο 31 Οκτ.', time: '19:30', place: 'Προαύλιο Νομικής', attendees: 32, lat: 37.9801, lng: 23.7338, color: '#83a940' },
  { id: 'indie', title: 'Indie Night', type: 'Μουσική & παρέα', day: 'Κυριακή 1 Νοε.', time: '20:00', place: 'Six d.o.g.s', attendees: 27, lat: 37.9787, lng: 23.7269, color: '#7594b3' },
]

const sampleNotes = [
  { id: 'algorithms', course: 'Πληροφορική · 3ο έτος', title: 'Αλγόριθμοι ΙΙ', detail: 'Αναλυτικές σημειώσεις · 8 κεφάλαια', author: 'Αλέξανδρος', image: people[0].image, pages: '42 σελ.', downloads: '18 φοιτητές' },
  { id: 'psychology', course: 'Ψυχολογία · 2ο έτος', title: 'Κοινωνική Ψυχολογία', detail: 'Περιλήψεις διαλέξεων & flashcards', author: 'Μαρία', image: people[1].image, pages: '36 σελ.', downloads: '24 φοιτητές' },
  { id: 'law', course: 'Νομική · 2ο έτος', title: 'Συνταγματικό Δίκαιο', detail: 'Σημειώσεις εξεταστικής · ενημερωμένες', author: 'Σοφία', image: people[7].image, pages: '51 σελ.', downloads: '31 φοιτητές' },
]

const musicPeers = [
  { ...people[2], genres: ['Indie electronic', 'Techno'], song: 'Midnight City · M83', score: 94 },
  { ...people[10], genres: ['Indie pop', 'Dream pop'], song: 'The Adults Are Talking · The Strokes', score: 89 },
  { ...people[8], genres: ['Jazz', 'Lo-fi'], song: 'Feather · Nujabes', score: 86 },
]

function MapFocus({ event }) {
  const map = useMap()
  useEffect(() => {
    if (event) map.flyTo([event.lat, event.lng], 15, { duration: 0.6 })
  }, [event, map])
  return null
}

function EventsView({ onConnectMusic, onNotify, notes, parties, category, onCategoryChange }) {
  const [connectedSpotify, setConnectedSpotify] = useState(false)
  const [selectedPartyId, setSelectedPartyId] = useState(null)
  const [requestedNotes, setRequestedNotes] = useState([])
  const selectedParty = parties.find((event) => event.id === selectedPartyId) ?? parties[0]
  const categories = [
    { id: 'notes', label: 'Σημειώσεις', icon: NotebookPen },
    { id: 'parties', label: 'Πάρτι & events', icon: CalendarDays },
    { id: 'music', label: 'Μουσική παρέα', icon: Headphones },
  ]

  return (
    <section className="events-view">
      <header className="events-heading">
        <p className="eyebrow">ΟΙ ΔΙΚΕΣ ΣΟΥ ΕΠΙΛΟΓΕΣ</p>
        <h1>Campus events<span>.</span></h1>
        <p>Διάλεξε τι ψάχνεις σήμερα.</p>
      </header>

      <div className="event-categories" role="tablist" aria-label="Κατηγορίες events">
        {categories.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={category === id} className={`event-category ${category === id ? 'event-category-active' : ''}`} onClick={() => onCategoryChange(id)}>
            <Icon size={16} /><span>{label}</span>
          </button>
        ))}
      </div>

      <div className="event-content" key={category}>
        {category === 'notes' && (
          <div className="notes-panel">
            <div className="section-title-row"><div><p className="eyebrow">ΜΟΙΡΑΣΜΑ ΓΝΩΣΗΣ</p><h2>Σημειώσεις από φοιτητές</h2></div><LibraryBig size={21} /></div>
            <p className="section-intro">Βρες υλικό για τα μαθήματά σου ή μοιράσου τις δικές σου σημειώσεις.</p>
            <div className="notes-list">
              {notes.map((note) => {
                const requested = requestedNotes.includes(note.id)
                return (
                  <article className="note-card" key={note.id}>
                    <div className="note-card-top"><span className="note-file-icon"><NotebookPen size={19} /></span><span className="note-pages">{note.pages}</span></div>
                    <p className="note-course">{note.course}</p>
                    <h3>{note.title}</h3>
                    <p className="note-detail">{note.detail}</p>
                    <div className="note-card-footer">
                      <span className="note-author"><img src={imageUrl(note.image, 80)} alt="" />{note.author}<i />{note.downloads}</span>
                      {note.fileUrl ? (
                        <a className="note-request note-open-file" href={note.fileUrl} download={note.fileName}>Άνοιγμα αρχείου</a>
                      ) : (
                        <button className={`note-request ${requested ? 'note-requested' : ''}`} onClick={() => {
                          setRequestedNotes((current) => current.includes(note.id) ? current : [...current, note.id])
                          onNotify(requested ? 'Το αίτημα έχει ήδη σταλεί' : `Ζήτησες τις σημειώσεις ${note.title}`)
                        }}>{requested ? <><Check size={14} /> Ζητήθηκαν</> : 'Ζήτα σημειώσεις'}</button>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        {category === 'parties' && (
          <div className="parties-panel">
            <div className="section-title-row"><div><p className="eyebrow">ΣΥΜΒΑΙΝΕΙ ΚΟΝΤΑ ΣΟΥ</p><h2>Στον χάρτη</h2></div><span className="sample-label"><span /> DEMO EVENTS</span></div>
            <div className="event-map-wrap">
              <MapContainer center={[37.9825, 23.729]} zoom={14} scrollWheelZoom={false} zoomControl={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapFocus event={selectedParty} />
                {parties.map((event) => (
                  <CircleMarker
                    key={event.id}
                    center={[event.lat, event.lng]}
                    radius={selectedParty?.id === event.id ? 11 : 8}
                    pathOptions={{ color: '#fffefa', fillColor: event.color, fillOpacity: 1, weight: 4 }}
                    eventHandlers={{ click: () => setSelectedPartyId(event.id) }}
                  >
                    <Popup><strong>{event.title}</strong><br />{event.day} · {event.time}<br />{event.place}</Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
              <div className="map-caption"><MapPin size={13} /> Αθήνα · Πανεπιστημιακή γειτονιά</div>
            </div>
            <div className="party-list-heading"><h3>Επόμενα events</h3><span>{parties.length} κοντά σου</span></div>
            <div className="party-list">
              {parties.map((event) => (
                <button className={`party-row ${selectedParty?.id === event.id ? 'party-row-active' : ''}`} key={event.id} onClick={() => setSelectedPartyId(event.id)}>
                  <span className="party-marker" style={{ '--marker-color': event.color }}><MapPin size={17} fill="currentColor" /></span>
                  <span className="party-info"><strong>{event.title}</strong><small>{event.place} · {event.type}</small><small className="party-meta"><CalendarDays size={12} /> {event.day} <Clock3 size={12} /> {event.time}</small></span>
                  <span className="party-count"><Users size={13} />{event.attendees}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {category === 'music' && (
          <div className="music-panel">
            <div className="music-hero">
              <span className="music-hero-icon"><Headphones size={24} /></span>
              <p className="eyebrow">ΒΡΕΣ ΤΟΝ ΡΥΘΜΟ ΣΟΥ</p>
              <h2>Ίδια μουσική.<br /><span>Ίδια συχνότητα.</span></h2>
              <p>Σύνδεσε το Spotify για να βρεις φοιτητές με κοινά μουσικά γούστα.</p>
              <button className={`spotify-connect ${connectedSpotify ? 'spotify-connected' : ''}`} onClick={() => setConnectedSpotify((connected) => !connected)}>
                {connectedSpotify ? <Check size={17} /> : <Play size={16} fill="currentColor" />}
                {connectedSpotify ? 'Το Spotify συνδέθηκε' : 'Σύνδεση Spotify'}
              </button>
              <small className="spotify-demo-note">Demo σύνδεση · δεν κοινοποιούνται playlists</small>
            </div>
            {connectedSpotify && (
              <div className="music-results">
                <div className="music-results-heading"><div><p className="eyebrow">ΒΑΣΕΙ ΚΟΙΝΩΝ ΑΚΟΥΣΜΑΤΩΝ</p><h3>Φοιτητές στο ίδιο vibe</h3></div><Music2 size={20} /></div>
                {musicPeers.map((person) => (
                  <article className="music-person" key={person.name}>
                    <img src={imageUrl(person.image, 150)} alt="" />
                    <div className="music-person-copy"><strong>{person.name}, {person.age}</strong><span>{person.subject}</span><small><Play size={11} fill="currentColor" /> {person.song}</small><div className="genre-chips">{person.genres.map((genre) => <i key={genre}>{genre}</i>)}</div></div>
                    <div className="music-score">{person.score}%<small>κοινά</small></div>
                    <button className="music-meet" aria-label={`Γνώρισε τον/την ${person.name}`} onClick={() => onConnectMusic(person)}><MessageCircle size={16} /></button>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function ProfileView({ connected, onConnect, onAddNote, onAddEvent, onNotify }) {
  const [noteCourse, setNoteCourse] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventPlace, setEventPlace] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventType, setEventType] = useState('Φοιτητικό event')

  if (!connected) {
    return (
      <section className="profile-connect-view">
        <div className="profile-connect-art"><Users size={31} /></div>
        <p className="eyebrow">PAREA · CAMPUS COMMUNITY</p>
        <h1>Το προφίλ σου,<br /><span>η δική σου κοινότητα.</span></h1>
        <p>Συνδέσου για να μοιραστείς σημειώσεις, να οργανώσεις events και να γνωρίσεις φοιτητές με κοινά ενδιαφέροντα.</p>
        <button className="profile-connect-button" onClick={onConnect}><LogIn size={17} /> Σύνδεση προφίλ</button>
        <small>Demo σύνδεση · τα στοιχεία μένουν σε αυτή τη συσκευή</small>
      </section>
    )
  }

  return (
    <section className="profile-dashboard">
      <header className="profile-dashboard-heading">
        <p className="eyebrow">ΤΟ CAMPUS ΠΡΟΦΙΛ ΣΟΥ</p>
        <h1>Καλώς ήρθες,<br /><span>φοιτητή.</span></h1>
        <div className="profile-connected-badge"><span /> Συνδεδεμένο προφίλ</div>
      </header>

      <section className="contribution-section">
        <div className="contribution-title"><span><NotebookPen size={17} /></span><div><h2>Μοιράσου σημειώσεις</h2><p>Βοήθησε κι άλλους φοιτητές στο μάθημα.</p></div></div>
        <label className="profile-field-label" htmlFor="note-course">Μάθημα</label>
        <input id="note-course" className="profile-input" value={noteCourse} onChange={(event) => setNoteCourse(event.target.value)} placeholder="π.χ. Αλγόριθμοι ΙΙ" />
        <label className="upload-dropzone">
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} />
          <span className="upload-icon"><Upload size={19} /></span>
          <span><strong>{selectedFile ? selectedFile.name : 'Επίλεξε αρχείο σημειώσεων'}</strong><small>PDF, Word, PowerPoint ή εικόνα</small></span>
          <Plus size={17} />
        </label>
        <button className="contribution-submit" disabled={!selectedFile || !noteCourse.trim()} onClick={() => {
          onAddNote({ file: selectedFile, course: noteCourse.trim() })
          setSelectedFile(null)
          setNoteCourse('')
          if (fileInputRef.current) fileInputRef.current.value = ''
        }}><Upload size={15} /> Ανέβασε σημειώσεις</button>
      </section>

      <section className="contribution-section">
        <div className="contribution-title"><span className="event-title-icon"><CalendarDays size={17} /></span><div><h2>Πρόσθεσε νέο event</h2><p>Η εκδήλωσή σου θα εμφανιστεί στην κατηγορία Πάρτι & events.</p></div></div>
        <form className="event-create-form" onSubmit={(event) => {
          event.preventDefault()
          onAddEvent({ title: eventTitle.trim(), place: eventPlace.trim(), date: eventDate, time: eventTime, type: eventType })
          setEventTitle('')
          setEventPlace('')
          setEventDate('')
          setEventTime('')
        }}>
          <label className="profile-field-label" htmlFor="event-title">Όνομα event</label>
          <input id="event-title" className="profile-input" required value={eventTitle} onChange={(event) => setEventTitle(event.target.value)} placeholder="π.χ. Study group στη βιβλιοθήκη" />
          <label className="profile-field-label" htmlFor="event-place">Τοποθεσία</label>
          <input id="event-place" className="profile-input" required value={eventPlace} onChange={(event) => setEventPlace(event.target.value)} placeholder="π.χ. Κεντρική βιβλιοθήκη" />
          <div className="profile-form-row">
            <div><label className="profile-field-label" htmlFor="event-date">Ημερομηνία</label><input id="event-date" className="profile-input" type="date" required value={eventDate} onChange={(event) => setEventDate(event.target.value)} /></div>
            <div><label className="profile-field-label" htmlFor="event-time">Ώρα</label><input id="event-time" className="profile-input" type="time" required value={eventTime} onChange={(event) => setEventTime(event.target.value)} /></div>
          </div>
          <label className="profile-field-label" htmlFor="event-type">Κατηγορία</label>
          <select id="event-type" className="profile-input" value={eventType} onChange={(event) => setEventType(event.target.value)}><option>Φοιτητικό event</option><option>Πάρτι</option><option>Μουσική</option><option>Ομάδα διαβάσματος</option><option>Εθελοντισμός</option></select>
          <button className="contribution-submit event-submit" type="submit"><Plus size={16} /> Δημοσίευσε event</button>
        </form>
      </section>
    </section>
  )
}

export default function App() {
  const [deck, setDeck] = useState(people)
  const [activeTab, setActiveTab] = useState('discover')
  const [eventCategory, setEventCategory] = useState('notes')
  const [profileConnected, setProfileConnected] = useState(false)
  const [notes, setNotes] = useState(sampleNotes)
  const [parties, setParties] = useState(sampleParties)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [exitDirection, setExitDirection] = useState(null)
  const [matchPerson, setMatchPerson] = useState(null)
  const [connectCount, setConnectCount] = useState(0)
  const [connections, setConnections] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [undoPerson, setUndoPerson] = useState(null)
  const [notice, setNotice] = useState('')

  const swipe = (direction) => {
    if (exitDirection || deck.length === 0) return
    const swipedPerson = deck[0]
    setExitDirection(direction)
    setUndoPerson(swipedPerson)
    window.setTimeout(() => {
      setDeck((current) => [...current.slice(1), current[0]])
      setDragX(0)
      setExitDirection(null)
      if (direction === 'right') {
        setConnections((current) => current.some((person) => person.name === swipedPerson.name)
          ? current
          : [{ ...swipedPerson, messages: [] }, ...current])
        const nextCount = connectCount + 1
        setConnectCount(nextCount)
        if (nextCount === 1 || nextCount % 3 === 0) setMatchPerson(swipedPerson)
      }
    }, 350)
  }

  const handlePointerDown = (event) => {
    if (exitDirection) return
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.dataset.startX = String(event.clientX)
    setIsDragging(true)
  }
  const handlePointerMove = (event) => {
    if (!isDragging || !event.currentTarget.dataset.startX) return
    setDragX(event.clientX - Number(event.currentTarget.dataset.startX))
  }
  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX > 100) swipe('right')
    else if (dragX < -100) swipe('left')
    else setDragX(0)
  }

  const undo = () => {
    if (!undoPerson || exitDirection) return
    setDeck((current) => [undoPerson, ...current.slice(0, -1)])
    setUndoPerson(null)
    setNotice('Η τελευταία κάρτα επέστρεψε')
    window.setTimeout(() => setNotice(''), 1800)
  }

  const openMessages = (person = matchPerson) => {
    setMatchPerson(null)
    setActiveTab('messages')
    setActiveConversation(person?.name ?? null)
  }

  const sendMessage = (name, text) => {
    setConnections((current) => current.map((person) => person.name === name
      ? { ...person, messages: [...person.messages, { from: 'me', text }] }
      : person))
  }

  const connectMusicPeer = (person) => {
    setConnections((current) => current.some((connection) => connection.name === person.name)
      ? current
      : [{ ...person, messages: [] }, ...current])
    setActiveConversation(person.name)
    setActiveTab('messages')
  }

  const addNote = ({ file, course }) => {
    const fileName = file.name
    const title = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
    const fileType = fileName.split('.').pop()?.toUpperCase() ?? 'ΑΡΧΕΙΟ'
    setNotes((current) => [{
      id: `note-${Date.now()}`,
      course,
      title,
      detail: `Αρχείο σημειώσεων · ${fileName}`,
      author: 'Εσύ',
      image: people[0].image,
      pages: fileType,
      downloads: 'Μόλις τώρα',
      fileName,
      fileUrl: URL.createObjectURL(file),
    }, ...current])
    setEventCategory('notes')
    setActiveTab('events')
    setNotice('Οι σημειώσεις σου δημοσιεύτηκαν')
    window.setTimeout(() => setNotice(''), 2200)
  }

  const addEvent = ({ title, place, date, time, type }) => {
    const dateLabel = new Date(`${date}T12:00:00`).toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'short' })
    const offset = parties.length * 0.001
    setParties((current) => [{
      id: `event-${Date.now()}`,
      title,
      type,
      day: dateLabel.charAt(0).toLocaleUpperCase('el-GR') + dateLabel.slice(1),
      time,
      place,
      attendees: 1,
      lat: 37.9825 + offset,
      lng: 23.729 + offset,
      color: type === 'Πάρτι' ? '#ed775d' : type === 'Μουσική' ? '#7594b3' : '#83a940',
    }, ...current])
    setEventCategory('parties')
    setActiveTab('events')
    setNotice('Το event σου προστέθηκε στον χάρτη')
    window.setTimeout(() => setNotice(''), 2200)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand-mark" onClick={() => setActiveTab('discover')} aria-label="parea, αρχική">
          <span className="brand-flower">✳</span><span>parea<span className="brand-period">.</span></span>
        </button>
        <div className="campus-pill"><span /> ΠΑΝΕΠΙΣΤΗΜΙΟ ΑΘΗΝΩΝ</div>
        <button className="notification-button" aria-label="Ειδοποιήσεις" onClick={() => { setNotice('Δεν έχεις νέες ειδοποιήσεις'); window.setTimeout(() => setNotice(''), 2000) }}><Bell size={19} /><i /></button>
      </header>

      {activeTab === 'discover' ? (
        <section className="discover-view" aria-label="Ανακάλυψε φοιτητές">
          <div className="discover-heading">
            <div><p className="eyebrow">ΜΑΘΗΜΑΤΑ · ΟΜΑΔΕΣ · CAMPUS</p><h1>Βρες την ομάδα<br /><span>σου στο campus.</span></h1></div>
            <button className="filter-button" aria-label="Κοινά μαθήματα" onClick={() => { setNotice('Προτάσεις με κοινά μαθήματα και ενδιαφέροντα'); window.setTimeout(() => setNotice(''), 2500) }}><Sparkles size={17} /><span>Κοινά</span></button>
          </div>

          <div className="deck-meta"><span><Users size={14} /> <strong>{deck.length}</strong> φοιτητές & ομάδες κοντά σου</span><span>ΠΡΟΤΑΣΕΙΣ CAMPUS</span></div>
          <div className={`card-stack ${isDragging ? 'is-dragging' : ''}`}>
            {deck.slice(0, 2).reverse().map((person, reverseIndex) => {
              const index = reverseIndex === 1 ? 0 : 1
              return <ProfileCard key={person.name} person={person} index={index} dragX={dragX} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} exiting={index === 0 ? exitDirection : null} />
            })}
            {deck.length === 0 && <div className="deck-empty"><Sparkles size={30} /><h2>Όλοι οι δρόμοι<br />οδηγούν σε παρέες.</h2><button onClick={() => setDeck(people)}>Ξεκίνα από την αρχή</button></div>}
          </div>

          <div className="card-actions">
            <button className="undo-action" aria-label="Αναίρεση" onClick={undo} disabled={!undoPerson}><ArrowLeft size={17} /></button>
            <button className="pass-action" onClick={() => swipe('left')} aria-label="Επόμενη πρόταση"><ChevronRight size={19} /><span>ΑΛΛΗ ΠΡΟΤΑΣΗ</span></button>
            <button className="connect-action" onClick={() => swipe('right')} aria-label="Γνώρισε αυτή την ομάδα"><UsersRound size={20} /><span>ΓΝΩΡΙΣΕ</span></button>
            <button className="next-action" aria-label="Επόμενη κάρτα" onClick={() => swipe('left')}><X size={17} /></button>
          </div>
          <p className="swipe-hint"><span>←</span> ΕΠΟΜΕΝΗ ΠΡΟΤΑΣΗ <i /> ΓΝΩΡΙΣΕ <span>→</span></p>
        </section>
      ) : activeTab === 'events' ? (
        <EventsView
          onConnectMusic={connectMusicPeer}
          onNotify={(message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2200) }}
          notes={notes}
          parties={parties}
          category={eventCategory}
          onCategoryChange={setEventCategory}
        />
      ) : activeTab === 'messages' ? (
        <MessagesView
          connections={connections}
          activeThread={activeConversation}
          onSelect={setActiveConversation}
          onBack={() => setActiveConversation(null)}
          onSend={sendMessage}
          onDiscover={() => setActiveTab('discover')}
        />
      ) : (
        <ProfileView
          connected={profileConnected}
          onConnect={() => {
            setProfileConnected(true)
            setNotice('Το προφίλ σου συνδέθηκε')
            window.setTimeout(() => setNotice(''), 2200)
          }}
          onAddNote={addNote}
          onAddEvent={addEvent}
        />
      )}

      {notice && <div className="notice-toast" role="status"><Check size={15} />{notice}</div>}

      <nav className="bottom-nav" aria-label="Κύρια πλοήγηση">
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const itemCount = id === 'messages' ? connections.length : badge
          return (
            <button key={id} className={`nav-item ${activeTab === id ? 'nav-active' : ''}`} onClick={() => { setActiveTab(id); if (id === 'messages') setActiveConversation(null) }} aria-current={activeTab === id ? 'page' : undefined}>
              <span className="nav-icon-wrap"><Icon size={21} strokeWidth={activeTab === id ? 2.4 : 1.8} />{itemCount > 0 && <i>{itemCount}</i>}</span><span>{label}</span>
            </button>
          )
        })}
      </nav>

      {matchPerson && <MatchModal person={matchPerson} onClose={() => setMatchPerson(null)} onMessage={() => openMessages(matchPerson)} />}
    </main>
  )
}