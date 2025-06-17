// App Version
        const APP_VERSION = '2.1.0';

        // Game State für Impostor
        let gameState = {
            totalPlayers: 4,
            impostors: 1,
            timerEnabled: false,
            timerMinutes: 2,
            hintsEnabled: true,
            selectedCategories: ['alle'],
            currentPlayer: 1,
            gameWord: '',
            gameHint: '',
            impostorPlayers: [],
            playerEmojis: [],
            playerNames: [],
            startingPlayer: null,
            timer: null,
            timeLeft: 0,
            gameStartTime: null,
            roundDuration: 0,
            hasRevealed: false,
            chaosMode: false
        };

        // Game State für Wer Würde Eher
        let werWuerdeState = {
            selectedCategories: ['klassisch'],
            usedQuestions: []
        };

        // Settings
        let settings = {
            soundsEnabled: true,
            vibrationEnabled: true,
            lightTheme: false
        };

        // Stats and Achievements
        let playerStats = {
            gamesPlayed: 0,
            fastestGame: null,
            longestGame: null,
            totalPlayTime: 0
        };
        
        let gameHistory = [];
        let achievements = {};

        // Easter Egg Variables
        let easterEggClicks = 0;
        let easterEggTimer = null;

        // Wer Würde Eher Questions by category
        const WER_WUERDE_QUESTIONS = {
            klassisch: [
                "den ganzen Tag im Schlafanzug bleiben?",
                "beim ersten Date zu spät kommen?",
                "in der Öffentlichkeit stolpern?",
                "ein Geheimnis nicht für sich behalten können?",
                "beim Karaoke das Mikrofon nicht mehr loslassen?",
                "sich in einem Kaufhaus verlaufen?",
                "beim Kochen das Essen anbrennen lassen?",
                "im Kino laut über den Film sprechen?",
                "beim Sport als erstes aufgeben?",
                "beim Tanzen alle Blicke auf sich ziehen?",
                "beim Fotografieren die schlechtesten Bilder machen?",
                "in einem wichtigen Meeting einschlafen?",
                "beim Autofahren sich mehrmals verfahren?",
                "beim Spieleabend zu ehrgeizig werden?",
                "beim Shopping das Budget komplett sprengen?",
                "bei einer Party als erstes nach Hause gehen?",
                "beim Grillen das Fleisch verkohlen?",
                "beim Smalltalk in peinliche Stille verfallen?",
                "beim Putzen mehr Chaos anrichten?",
                "beim Streaming die ganze Nacht durchmachen?"
            ],
            
            party: [
                "bei einer Party auf dem Tisch tanzen?",
                "Karaoke singen und dabei völlig schief sein?",
                "bei einem Trinkspiel als erstes ausscheiden?",
                "bei einer Party in der Küche enden?",
                "beim Tanzen alle anderen übertreffen?",
                "bei einer Party neue Freunde finden?",
                "die verrücktesten Dance Moves zeigen?",
                "bei einer Party das Kostüm vergessen?",
                "beim Beer Pong unschlagbar sein?",
                "bei einer Hausparty beim Aufräumen helfen?",
                "bei einem Festival im Matsch tanzen?",
                "bei einer Party als DJ auflegen?",
                "bei einem Kostümball die beste Verkleidung haben?",
                "bei einer Gartenparty grillen wollen?",
                "bei einer Silvesterparty um Mitternacht schlafen?",
                "bei einer Geburtstagsparty die Kerzen auspusten?",
                "bei einer Poolparty als erstes ins Wasser springen?",
                "bei einer Mottoparty das Thema ignorieren?",
                "bei einer Abschlussfeier emotional werden?",
                "bei einer Überraschungsparty das Geheimnis verraten?"
            ],
            
            spicy: [
                "bei einem Date das Essen bezahlen?",
                "beim ersten Kuss die Augen offen lassen?",
                "eine Fernbeziehung führen?",
                "beim Speed-Dating als erstes 'Nein' sagen?",
                "bei einem romantischen Dinner sabbern?",
                "beim Flirten zu direkt sein?",
                "bei einem Blind Date weglaufen?",
                "beim Küssen gegen etwas stoßen?",
                "bei einer Hochzeit den falschen Namen sagen?",
                "beim ersten Date über den Ex sprechen?",
                "bei einem romantischen Film weinen?",
                "beim Valentinstag das Geschenk vergessen?",
                "bei einem Candle-Light-Dinner das Tischtuch anzünden?",
                "beim ersten 'Ich liebe dich' stottern?",
                "bei einem Liebesbrief die falsche Person ansprechen?",
                "beim Heiratsantrag 'Nein' sagen?",
                "bei der Hochzeitsrede einen Blackout haben?",
                "beim Honeymoon krank werden?",
                "bei einem romantischen Picknick von Wespen attackiert werden?",
                "beim Anniversary das Datum vergessen?"
            ],
            
            wild: [
                "bei einer Mutprobe als erstes kneifen?",
                "beim Bungee-Jumping schreien wie ein Baby?",
                "bei einer Achterbahnfahrt sich übergeben?",
                "beim Skydiving die Augen die ganze Zeit geschlossen halten?",
                "bei einem Horrorfilm unter der Decke verschwinden?",
                "beim Camping von einem Käfer aufgeweckt werden?",
                "bei einer Nachtwanderung sich verlaufen?",
                "beim Klettern nach 2 Metern aufgeben?",
                "bei einer Geisterbahn um Hilfe schreien?",
                "beim Wildwasser-Rafting über Bord gehen?",
                "bei einem Survival-Trip als erstes nach Hause wollen?",
                "beim Paragliding in Panik geraten?",
                "bei einer Safari das Tier füttern wollen?",
                "beim Tauchen die Orientierung verlieren?",
                "bei einem Escape Room alle Hinweise übersehen?",
                "beim Paintball sich sofort verstecken?",
                "bei einer Nachtsafari einschlafen?",
                "beim Ziplining stecken bleiben?",
                "bei einem Outdoor-Abenteuer den Weg nach Hause vergessen?",
                "beim Extremsport als erstes einen Helm verlangen?"
            ],
            
            freunde: [
                "bei einem Streit als erstes nachgeben?",
                "ein Geheimnis am längsten für sich behalten?",
                "bei einem Umzug als erstes helfen?",
                "bei Liebeskummer die beste Schulter zum Ausweinen sein?",
                "bei einer Gruppenentscheidung nie eine Meinung haben?",
                "beim Gruppenfotos immer lustige Gesichter machen?",
                "bei einem Spieleabend zu kompetitiv werden?",
                "bei einer Reise das meiste Gepäck haben?",
                "bei einem Restaurant-Besuch am längsten fürs Essen brauchen?",
                "bei einer WhatsApp-Gruppe als erstes antworten?",
                "bei einem gemeinsamen Hobby schnell das Interesse verlieren?",
                "bei einer Überraschungsparty das Geheimnis ausplaudern?",
                "bei einem Gruppenprojekt die meiste Arbeit machen?",
                "bei einem Filmabend den Film auswählen wollen?",
                "bei einem gemeinsamen Urlaub das Budget planen?",
                "bei einem Grillabend das Fleisch übernehmen?",
                "bei einem Picknick das Essen vergessen?",
                "bei einem Spieleabend bei Monopoly ausrasten?",
                "bei einem Gruppengeschenk das meiste Geld ausgeben?",
                "bei einer Gruppenaktivität als erstes müde werden?"
            ],
            
            drama: [
                "bei einem Streit laut werden?",
                "bei schlechten Nachrichten überreagieren?",
                "bei einem Missverständnis nicht nachfragen?",
                "bei Kritik beleidigt sein?",
                "bei einem Problem sofort aufgeben?",
                "bei Stress alle anderen anstecken?",
                "bei einer Diskussion persönlich werden?",
                "bei einem Fehler andere beschuldigen?",
                "bei einer Enttäuschung tagelang schmollen?",
                "bei einem Kompliment misstrauisch werden?",
                "bei einer Veränderung panisch reagieren?",
                "bei einem Vorwurf sofort rechtfertigen?",
                "bei einer Absage dramatisch reagieren?",
                "bei einem Konflikt alle anderen reinziehen?",
                "bei einer schlechten Bewertung aufhören?",
                "bei einem Misserfolg anderen die Schuld geben?",
                "bei einer Krise den Kopf in den Sand stecken?",
                "bei einer Herausforderung sofort zweifeln?",
                "bei einem Rückschlag alles hinschmeißen?",
                "bei einer Niederlage schlechte Verlierer sein?"
            ],
            
            secrets: [
                "heimlich das Handy des Partners checken?",
                "bei einer Lüge rot werden?",
                "bei einem Geheimnis platzen vor Neugier?",
                "bei einer peinlichen Geschichte alle Details erzählen?",
                "bei einem Klatsch sofort weitererzählen?",
                "bei einer Überraschung Hinweise geben?",
                "bei einem Geständnis schockiert sein?",
                "bei einer Enthüllung übertrieben reagieren?",
                "bei einem Skandal sofort urteilen?",
                "bei einer Verschwörungstheorie sofort glauben?",
                "bei einem Gerücht nachforschen?",
                "bei einem Tabu neugierig nachfragen?",
                "bei einer Beichte alle Details wollen?",
                "bei einem Verdacht sofort konfrontieren?",
                "bei einem Fehltritt hart verurteilen?",
                "bei einer Affäre Partei ergreifen?",
                "bei einem Geheimnis Detektiv spielen?",
                "bei einer Enthüllung geschockt schweigen?",
                "bei einem Skandal Distance halten?",
                "bei einer Lüge sofort durchschauen?"
            ],

            adults: [
                "bei einem One-Night-Stand den Namen vergessen?",
                "beim ersten Mal awkward sein?",
                "heimlich Pornos schauen?",
                "beim Sexting die falsche Person anschreiben?",
                "bei einer Strip-Show rot werden?",
                "beim Dirty Talk stottern?",
                "in der Öffentlichkeit anzügliche Kommentare machen?",
                "bei einem Sexshop nervös werden?",
                "beim Knutschen sabbern?",
                "bei 50 Shades of Grey einschlafen?",
                "beim Pillow Talk zu viel verraten?",
                "bei einer Sexparty nicht wissen wohin?",
                "heimlich Tinder nutzen während vergeben?",
                "beim Orgasmus zu laut sein?",
                "bei Adult-Toys neugierig werden?",
                "beim Netflix & Chill nur Netflix schauen?",
                "bei einem Seitensprung erwischt werden?",
                "beim Flirten mit dem Ex schwach werden?",
                "bei einer heißen Nachricht einen Screenshot machen?",
                "beim Morning-After bereuen was passiert ist?"
            ]
        };

        // Category metadata für Wer Würde Eher
        const WER_WUERDE_CATEGORY_INFO = {
            klassisch: { emoji: "🧠", name: "Klassisch", count: 20 },
            party: { emoji: "🎉", name: "Party", count: 20 },
            spicy: { emoji: "🌶️", name: "Spicy", count: 20 },
            wild: { emoji: "🐍", name: "Wild & Chaotisch", count: 20 },
            freunde: { emoji: "👫", name: "Wahre Freunde", count: 20 },
            drama: { emoji: "🎭", name: "Drama", count: 20 },
            secrets: { emoji: "💀", name: "Dirty Little Secrets", count: 20 },
            adults: { emoji: "🔞", name: "Adults Only", count: 20 }
        };

     

        // Calculate total count for "alle"
        CATEGORY_INFO.alle.count = Object.keys(WORD_CATEGORIES).reduce((total, key) => {
            return total + WORD_CATEGORIES[key].length;
        }, 0);

        const coolEmojis = ['😎', '🤩', '🔥', '⚡', '🎯', '💀', '💎', '👾', '🪼', '🎊', '🎉', '🦄', '🐉', '👑', '🏆'];

        // Achievement definitions
        const ACHIEVEMENTS = {
            firstGame: { name: "Erstes Spiel", description: "Spiele dein erstes Spiel", icon: "🎮" },
            veteran: { name: "Veteran", description: "Spiele 25 Spiele", icon: "🏅" },
            speedRunner: { name: "Speedrunner", description: "Spiele unter 30 Sekunden", icon: "⚡" },
            marathon: { name: "Marathon", description: "Spiele über 10 Minuten", icon: "🏃" },
            social: { name: "Gesellig", description: "Spiele mit 10+ Personen", icon: "👥" },
            dedicated: { name: "Hingabe", description: "Spiele 100 Spiele", icon: "💯" },
            explorer: { name: "Entdecker", description: "Spiele alle Kategorien", icon: "🗺️" },
            curious: { name: "Neugierig", description: "Finde das Easter Egg", icon: "🕵️" }
        };

        // Audio Context for Sound Effects
        let audioContext;

        // Initialize player names array
        function initializePlayerNames() {
            gameState.playerNames = [];
            for (let i = 1; i <= gameState.totalPlayers; i++) {
                gameState.playerNames.push(`Spieler ${i}`);
            }
        }

        // Easter Egg Function
        function handleEasterEggClick() {
            easterEggClicks++;
            playSound('tap');
            
            if (easterEggTimer) {
                clearTimeout(easterEggTimer);
            }
            
            easterEggTimer = setTimeout(() => {
                easterEggClicks = 0;
            }, 3000);
            
            if (easterEggClicks >= 5) {
                easterEggClicks = 0;
                clearTimeout(easterEggTimer);
                
                if (!achievements.curious) {
                    achievements.curious = true;
                    showAchievementNotification([ACHIEVEMENTS.curious]);
                }
                
                setTimeout(() => {
                    showComingSoonModal();
                }, 1000);
                
                return;
            }
            
            const card = event.target.closest('.coming-soon-card');
            if (card) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 100);
                
                vibrate([20]);
            }
        }
        
        // Sound Effects
        function playSound(type) {
            if (!settings.soundsEnabled) return;
            
            try {
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                switch(type) {
                    case 'card-flip':
                        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);
                        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.15);
                        break;
                        
                    case 'success':
                        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                        oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
                        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
                        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);
                        gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.4);
                        break;
                        
                    case 'shuffle':
                        for(let i = 0; i < 4; i++) {
                            const osc = audioContext.createOscillator();
                            const gain = audioContext.createGain();
                            osc.connect(gain);
                            gain.connect(audioContext.destination);
                            osc.frequency.setValueAtTime(200 + i * 80, audioContext.currentTime + i * 0.08);
                            gain.gain.setValueAtTime(0.06, audioContext.currentTime + i * 0.08);
                            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + i * 0.08 + 0.12);
                            osc.start(audioContext.currentTime + i * 0.08);
                            osc.stop(audioContext.currentTime + i * 0.08 + 0.12);
                        }
                        break;
                        
                    case 'tap':
                        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.08);
                        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.08);
                        break;
                }
            } catch(e) {
                console.log('Audio not supported');
            }
        }

        // Haptic Feedback
        function vibrate(pattern) {
            if (settings.vibrationEnabled && 'vibrate' in navigator) {
                navigator.vibrate(pattern || [100]);
            }
        }

        // EINFACHE NAVIGATION
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.add('hidden');
            });
            document.getElementById(screenId).classList.remove('hidden');
            
            const settingsIcon = document.getElementById('settingsIcon');
            const infoIcon = document.getElementById('infoIcon');
            
            if (settingsIcon && infoIcon) {
                if (screenId === 'modeSelectScreen') {
                    settingsIcon.style.display = 'flex';
                    infoIcon.style.display = 'flex';
                } else {
                    settingsIcon.style.display = 'none';
                    infoIcon.style.display = 'none';
                }
            }
        }

        function navigateToHome() {
            window.location.href = "../";
            playSound('tap');
        }

        function navigateBack(targetScreen) {
            showScreen(targetScreen);
            playSound('tap');
        }

        function showImpostorSettings() {
            window.location.href = "impostor/";
            showScreen('impostorScreen');
            updateGameSettingsDisplay();
            playSound('tap');
        }

        function showWerWuerdeSettings() {
            showScreen('werWuerdeScreen');
            updateWerWuerdeSettingsDisplay();
            playSound('tap');
        }

        function revealWerWuerdeCard() {
            const card = document.getElementById('werWuerdeHomeCard');
            const covered = document.getElementById('werWuerdeCovered');
            const revealed = document.getElementById('werWuerdeRevealed');
            
            // Simple reveal - just hide covered and show revealed
            covered.style.display = 'none';
            revealed.style.display = 'flex';
            
            // Change card styling to normal wer-wuerde card
            card.className = 'game-card wer-wuerde-card';
            
            // Change onclick to go to settings after reveal
            card.onclick = () => showWerWuerdeSettings();
            
            playSound('card-flip');
            vibrate([50]);
        }

        // Impostor Game Functions
        function changePlayerCount(delta) {
            gameState.totalPlayers = Math.max(3, Math.min(20, gameState.totalPlayers + delta));
            if (gameState.impostors >= Math.floor(gameState.totalPlayers / 2)) {
                gameState.impostors = Math.max(1, Math.floor(gameState.totalPlayers / 2) - 1);
            }
            
            while (gameState.playerNames.length < gameState.totalPlayers) {
                gameState.playerNames.push(`Spieler ${gameState.playerNames.length + 1}`);
            }
            if (gameState.playerNames.length > gameState.totalPlayers) {
                gameState.playerNames = gameState.playerNames.slice(0, gameState.totalPlayers);
            }
            
            updateGameSettingsDisplay();
            playSound('card-flip');
            vibrate([30]);
        }

        function changeImpostorCount(delta) {
            // Disable impostor count changes in chaos mode
            if (gameState.chaosMode) {
                playSound('tap');
                vibrate([20]);
                return;
            }
            
            gameState.impostors = Math.max(1, Math.min(Math.floor(gameState.totalPlayers / 2), gameState.impostors + delta));
            updateGameSettingsDisplay();
            playSound('card-flip');
            vibrate([30]);
        }

        function toggleTimer() {
            gameState.timerEnabled = !gameState.timerEnabled;
            const toggle = document.getElementById('timerToggle');
            const minutesRow = document.getElementById('timerMinutesRow');
            
            toggle.classList.toggle('active', gameState.timerEnabled);
            minutesRow.style.display = gameState.timerEnabled ? 'flex' : 'none';
            playSound('card-flip');
            vibrate([30]);
        }

        function changeTimerMinutes(delta) {
            gameState.timerMinutes = Math.max(1, Math.min(10, gameState.timerMinutes + delta));
            document.getElementById('timerMinutesCount').textContent = gameState.timerMinutes;
            playSound('card-flip');
            vibrate([30]);
        }

        function toggleHints() {
            gameState.hintsEnabled = !gameState.hintsEnabled;
            document.getElementById('hintsToggle').classList.toggle('active', gameState.hintsEnabled);
            playSound('card-flip');
            vibrate([30]);
        }

        function updateGameSettingsDisplay() {
            document.getElementById('playersCount').textContent = gameState.totalPlayers;
            
            // Special display for chaos mode
            if (gameState.chaosMode) {
                document.getElementById('impostorsCount').textContent = '😈';
                document.getElementById('impostorsCount').style.color = '#ff453a';
            } else {
                document.getElementById('impostorsCount').textContent = gameState.impostors;
                document.getElementById('impostorsCount').style.color = 'white';
            }
            
            document.getElementById('timerMinutesCount').textContent = gameState.timerMinutes;
            
            const timerToggle = document.getElementById('timerToggle');
            const minutesRow = document.getElementById('timerMinutesRow');
            timerToggle.classList.toggle('active', gameState.timerEnabled);
            minutesRow.style.display = gameState.timerEnabled ? 'flex' : 'none';
            
            updateCategoryButton();
        }

        function updateCategoryButton() {
            const categoryButton = document.getElementById('categoryButton');
            const categoryEmoji = document.getElementById('categoryEmoji');
            const categoryText = document.getElementById('categoryText');
            
            if (gameState.selectedCategories.includes('alle') || gameState.selectedCategories.length === 0) {
                categoryEmoji.textContent = CATEGORY_INFO.alle.emoji;
                categoryText.textContent = CATEGORY_INFO.alle.name;
            } else if (gameState.selectedCategories.length === 1) {
                const category = CATEGORY_INFO[gameState.selectedCategories[0]];
                categoryEmoji.textContent = category.emoji;
                categoryText.textContent = category.name;
            } else {
                categoryEmoji.textContent = '🎯';
                categoryText.textContent = `${gameState.selectedCategories.length} Kategorien`;
            }
        }

        // Secret Settings Functions
        function showSecretSettings() {
            updateSecretSettingsDisplay();
            document.getElementById('secretModal').classList.add('visible');
            playSound('tap');
            vibrate([30, 30, 30]);
        }

        function closeSecretModal() {
            document.getElementById('secretModal').classList.remove('visible');
            playSound('tap');
        }

        function updateSecretSettingsDisplay() {
            const chaosModeItem = document.getElementById('chaosModeItem');
            const chaosModeStatus = document.getElementById('chaosModeStatus');
            
            if (gameState.chaosMode) {
                chaosModeItem.classList.add('selected');
                chaosModeStatus.textContent = 'An';
                chaosModeStatus.style.background = 'rgba(76, 175, 80, 0.3)';
            } else {
                chaosModeItem.classList.remove('selected');
                chaosModeStatus.textContent = 'Aus';
                chaosModeStatus.style.background = 'rgba(255,255,255,0.2)';
            }
        }

        function toggleChaosMode() {
            gameState.chaosMode = !gameState.chaosMode;
            updateSecretSettingsDisplay();
            updateGameSettingsDisplay();
            playSound('card-flip');
            vibrate([50]);
            
            if (gameState.chaosMode) {
                // Show a little notification
                setTimeout(() => {
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        top: 100px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: #ff453a;
                        color: white;
                        padding: 12px 20px;
                        border-radius: 20px;
                        font-weight: 600;
                        z-index: 10000;
                        font-size: 14px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                    `;
                    notification.textContent = '😈 Chaos Mode aktiviert!';
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 2000);
                }, 100);
            }
        }
        function showNamesModal() {
            while (gameState.playerNames.length < gameState.totalPlayers) {
                gameState.playerNames.push(`Spieler ${gameState.playerNames.length + 1}`);
            }
            
            updateNamesDisplay();
            document.getElementById('namesModal').classList.add('visible');
            playSound('tap');
        }

        function closeNamesModal() {
            document.getElementById('namesModal').classList.remove('visible');
            playSound('tap');
        }

        function updateNamesDisplay() {
            const namesList = document.getElementById('namesList');
            namesList.innerHTML = '';
            
            for (let i = 0; i < gameState.totalPlayers; i++) {
                const nameItem = document.createElement('div');
                nameItem.className = 'category-item';
                nameItem.onclick = () => editPlayerName(i);
                
                nameItem.innerHTML = `
                    <div class="category-display">
                        <span class="category-emoji">${i + 1}</span>
                        <span id="nameDisplay${i}">${gameState.playerNames[i] || `Spieler ${i + 1}`}</span>
                    </div>
                    <div class="category-count">✏️</div>
                `;
                
                namesList.appendChild(nameItem);
            }
        }

        function editPlayerName(playerIndex) {
            const nameDisplay = document.getElementById(`nameDisplay${playerIndex}`);
            const currentName = gameState.playerNames[playerIndex] || `Spieler ${playerIndex + 1}`;
            
            nameDisplay.innerHTML = `<input type="text" style="background: transparent; border: none; color: white; font-size: clamp(16px, 4vw, 18px); font-weight: 600; outline: none; width: 100%; padding: 0;" id="nameInput${playerIndex}" value="${currentName}" maxlength="20">`;
            
            const input = document.getElementById(`nameInput${playerIndex}`);
            input.focus();
            input.select();
            
            const saveEdit = () => {
                const newName = input.value.trim() || `Spieler ${playerIndex + 1}`;
                gameState.playerNames[playerIndex] = newName;
                nameDisplay.textContent = newName;
                playSound('tap');
            };
            
            input.addEventListener('blur', saveEdit);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    saveEdit();
                }
            });
        }

        // Categories Management for Impostor
        function showCategoriesModal() {
            updateCategoriesDisplay();
            document.getElementById('categoriesModal').classList.add('visible');
            playSound('tap');
        }

        function closeCategoriesModal() {
            document.getElementById('categoriesModal').classList.remove('visible');
            updateCategoryButton();
            playSound('tap');
        }

        function updateCategoriesDisplay() {
            const categoriesList = document.getElementById('categoriesList');
            categoriesList.innerHTML = '';
            
            Object.keys(CATEGORY_INFO).forEach(categoryKey => {
                const category = CATEGORY_INFO[categoryKey];
                const isSelected = gameState.selectedCategories.includes(categoryKey);
                
                const categoryItem = document.createElement('div');
                categoryItem.className = `category-item ${isSelected ? 'selected' : ''}`;
                categoryItem.onclick = () => toggleCategory(categoryKey);
                
                categoryItem.innerHTML = `
                    <div class="category-display">
                        <span class="category-emoji">${category.emoji}</span>
                        <span>${category.name}</span>
                    </div>
                    <div class="category-count">${category.count}</div>
                `;
                
                categoriesList.appendChild(categoryItem);
            });
        }

        function toggleCategory(categoryKey) {
            if (categoryKey === 'alle') {
                gameState.selectedCategories = ['alle'];
            } else {
                if (gameState.selectedCategories.includes('alle')) {
                    gameState.selectedCategories = [];
                }
                
                const index = gameState.selectedCategories.indexOf(categoryKey);
                if (index > -1) {
                    gameState.selectedCategories.splice(index, 1);
                } else {
                    gameState.selectedCategories.push(categoryKey);
                }
                
                if (gameState.selectedCategories.length === 0) {
                    gameState.selectedCategories = ['alle'];
                }
            }
            
            updateCategoriesDisplay();
            playSound('tap');
            vibrate([20]);
        }

        // Wer Würde Eher Functions
        function updateWerWuerdeSettingsDisplay() {
            updateWerWuerdeCategoryButton();
        }

        function updateWerWuerdeCategoryButton() {
            const categoryEmoji = document.getElementById('werWuerdeCategoryEmoji');
            const categoryText = document.getElementById('werWuerdeCategoryText');
            
            if (werWuerdeState.selectedCategories.length === 1) {
                const category = WER_WUERDE_CATEGORY_INFO[werWuerdeState.selectedCategories[0]];
                categoryEmoji.textContent = category.emoji;
                categoryText.textContent = category.name;
            } else {
                categoryEmoji.textContent = '🎯';
                categoryText.textContent = `${werWuerdeState.selectedCategories.length} Kategorien`;
            }
        }

        function showWerWuerdeCategoriesModal() {
            updateWerWuerdeCategoriesDisplay();
            document.getElementById('werWuerdeCategoriesModal').classList.add('visible');
        }

        function closeWerWuerdeCategoriesModal() {
            document.getElementById('werWuerdeCategoriesModal').classList.remove('visible');
            updateWerWuerdeCategoryButton();
        }

        function updateWerWuerdeCategoriesDisplay() {
            const categoriesList = document.getElementById('werWuerdeCategoriesList');
            categoriesList.innerHTML = '';
            
            Object.keys(WER_WUERDE_CATEGORY_INFO).forEach(categoryKey => {
                const category = WER_WUERDE_CATEGORY_INFO[categoryKey];
                const isSelected = werWuerdeState.selectedCategories.includes(categoryKey);
                
                const categoryItem = document.createElement('div');
                categoryItem.className = `category-item ${isSelected ? 'selected' : ''}`;
                categoryItem.onclick = () => toggleWerWuerdeCategory(categoryKey);
                
                categoryItem.innerHTML = `
                    <div class="category-display">
                        <span class="category-emoji">${category.emoji}</span>
                        <span>${category.name}</span>
                    </div>
                    <div class="category-count">${category.count}</div>
                `;
                
                categoriesList.appendChild(categoryItem);
            });
        }

        function toggleWerWuerdeCategory(categoryKey) {
            const index = werWuerdeState.selectedCategories.indexOf(categoryKey);
            if (index > -1) {
                werWuerdeState.selectedCategories.splice(index, 1);
            } else {
                werWuerdeState.selectedCategories.push(categoryKey);
            }
            
            if (werWuerdeState.selectedCategories.length === 0) {
                werWuerdeState.selectedCategories = ['klassisch'];
            }
            
            updateWerWuerdeCategoriesDisplay();
            playSound('tap');
            vibrate([20]);
        }

        function startWerWuerdeGame() {
            werWuerdeState.usedQuestions = [];
            showScreen('werWuerdeGameScreen');
            showRandomWerWuerdeQuestion();
            playSound('shuffle');
            vibrate([50, 50, 50]);
        }

        function showRandomWerWuerdeQuestion() {
            let availableQuestions = [];
            werWuerdeState.selectedCategories.forEach(categoryKey => {
                if (WER_WUERDE_QUESTIONS[categoryKey]) {
                    availableQuestions = availableQuestions.concat(WER_WUERDE_QUESTIONS[categoryKey]);
                }
            });
            
            availableQuestions = availableQuestions.filter(q => 
                !werWuerdeState.usedQuestions.includes(q)
            );
            
            if (availableQuestions.length === 0) {
                werWuerdeState.usedQuestions = [];
                availableQuestions = [];
                werWuerdeState.selectedCategories.forEach(categoryKey => {
                    if (WER_WUERDE_QUESTIONS[categoryKey]) {
                        availableQuestions = availableQuestions.concat(WER_WUERDE_QUESTIONS[categoryKey]);
                    }
                });
            }
            
            const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            werWuerdeState.usedQuestions.push(randomQuestion);
            
            document.getElementById('werWuerdeQuestion').textContent = randomQuestion;
        }

        function nextWerWuerdeQuestion() {
            showRandomWerWuerdeQuestion();
            playSound('tap');
            vibrate([30]);
        }

        // Impostor Game Logic
        function generateImpostorGame() {
            let selectedWords = [];
            
            if (gameState.selectedCategories.includes('alle') || gameState.selectedCategories.length === 0) {
                Object.keys(WORD_CATEGORIES).forEach(categoryKey => {
                    selectedWords = selectedWords.concat(WORD_CATEGORIES[categoryKey]);
                });
            } else {
                gameState.selectedCategories.forEach(categoryKey => {
                    if (WORD_CATEGORIES[categoryKey]) {
                        selectedWords = selectedWords.concat(WORD_CATEGORIES[categoryKey]);
                    }
                });
            }
            
            const selectedWord = selectedWords[Math.floor(Math.random() * selectedWords.length)];
            gameState.gameWord = selectedWord.word;
            gameState.gameHint = selectedWord.hint;
            
            gameState.impostorPlayers = [];
            
            if (gameState.chaosMode) {
                // In chaos mode, ALL players are impostors
                for (let i = 1; i <= gameState.totalPlayers; i++) {
                    gameState.impostorPlayers.push(i);
                }
            } else {
                // Normal mode
                while (gameState.impostorPlayers.length < gameState.impostors) {
                    const randomPlayer = Math.floor(Math.random() * gameState.totalPlayers) + 1;
                    if (!gameState.impostorPlayers.includes(randomPlayer)) {
                        gameState.impostorPlayers.push(randomPlayer);
                    }
                }
            }
            
            gameState.playerEmojis = [];
            for (let i = 0; i < gameState.totalPlayers; i++) {
                gameState.playerEmojis.push(coolEmojis[i % coolEmojis.length]);
            }
        }

        function startImpostorGame() {
            if (gameState.playerNames.length === 0) {
                initializePlayerNames();
            }
            
            generateImpostorGame();
            gameState.currentPlayer = 1;
            gameState.gameStartTime = Date.now();
            
            showScreen('gameScreen');
            updateGameDisplay();
            
            playSound('shuffle');
            vibrate([50, 50, 50]);
        }

        function updateGameDisplay() {
            const playerName = gameState.playerNames[gameState.currentPlayer - 1] || `Spieler ${gameState.currentPlayer}`;
            document.getElementById('playerTitle').textContent = playerName;
            document.getElementById('playerEmoji').textContent = gameState.playerEmojis[gameState.currentPlayer - 1] || '👤';
            
            if (gameState.currentPlayer < gameState.totalPlayers) {
                document.getElementById('nextButton').textContent = 'Weitergeben';
            } else {
                document.getElementById('nextButton').textContent = 'Spiel starten';
            }
            
            const nextButton = document.getElementById('nextButton');
            nextButton.style.opacity = '0';
            nextButton.style.pointerEvents = 'none';
            nextButton.style.transform = 'translateX(-50%) translateY(20px)';
            
            gameState.hasRevealed = false;
            
            const instructionText = document.getElementById('instructionText');
            if (instructionText) {
                instructionText.style.opacity = '1';
                instructionText.textContent = 'Ziehe deine Karte nach oben, um das Wort zu sehen. Achte darauf, dass niemand es sieht.';
            }
        }

        // Show role with hold-to-reveal functionality
        function showRole() {
            const isImpostor = gameState.impostorPlayers.includes(gameState.currentPlayer);
            const roleIcon = document.getElementById('roleIcon');
            const roleText = document.getElementById('roleText');
            const wordOrHint = document.getElementById('wordOrHint');
            
            if (isImpostor) {
                roleIcon.textContent = '✕';
                roleIcon.style.background = '#f44336';
                roleText.textContent = '';
                if (gameState.hintsEnabled) {
                    wordOrHint.innerHTML = `<div style="background: rgba(255,255,255,0.95); border-radius: 20px; padding: clamp(18px, 4.5vw, 24px); font-size: clamp(18px, 4.5vw, 22px); color: #666; backdrop-filter: blur(10px); margin-bottom: 8px; min-height: clamp(60px, 12vh, 80px); display: flex; align-items: center; justify-content: center;">Tipp: ${gameState.gameHint}</div>`;
                } else {
                    wordOrHint.innerHTML = '<div style="background: rgba(255,255,255,0.95); border-radius: 20px; padding: clamp(18px, 4.5vw, 24px); font-size: clamp(18px, 4.5vw, 22px); color: #666; backdrop-filter: blur(10px); margin-bottom: 8px; min-height: clamp(60px, 12vh, 80px); display: flex; align-items: center; justify-content: center;">Kein Tipp verfügbar</div>';
                }
            } else {
                roleIcon.textContent = '✓';
                roleIcon.style.background = '#4CAF50';
                roleText.textContent = '';
                wordOrHint.innerHTML = `<div style="background: rgba(255,255,255,0.95); border-radius: 20px; padding: clamp(20px, 5vw, 28px); font-size: clamp(26px, 6.5vw, 32px); font-weight: 700; color: #333; backdrop-filter: blur(10px); margin-bottom: 8px;">${gameState.gameWord}</div>`;
            }
            
            document.getElementById('revealedContent').style.opacity = '1';
            document.getElementById('revealedContent').style.transform = 'translateY(0)';
            document.getElementById('revealedContent').style.pointerEvents = 'auto';
            document.getElementById('playerCard').style.transform = 'translateY(-20px)';
            document.getElementById('playerCard').style.boxShadow = '0 28px 60px rgba(0,0,0,0.3)';
            
            const instructionText = document.getElementById('instructionText');
            if (instructionText) {
                instructionText.style.opacity = '0';
            }
            
            playSound('tap');
            vibrate([30]);
        }

        function hideRole() {
            document.getElementById('revealedContent').style.opacity = '0';
            document.getElementById('revealedContent').style.transform = 'translateY(10px)';
            document.getElementById('revealedContent').style.pointerEvents = 'none';
            document.getElementById('playerCard').style.transform = 'translateY(0)';
            document.getElementById('playerCard').style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
            
            gameState.hasRevealed = true;
            
            const instructionText = document.getElementById('instructionText');
            if (instructionText) {
                instructionText.style.opacity = '1';
                instructionText.textContent = 'Gerät an den nächsten Spieler weitergeben';
            }
            
            setTimeout(() => {
                if (gameState.hasRevealed) {
                    const nextButton = document.getElementById('nextButton');
                    nextButton.style.opacity = '1';
                    nextButton.style.pointerEvents = 'auto';
                    nextButton.style.transform = 'translateX(-50%) translateY(0)';
                }
            }, 400);
        }

        function handleNextPlayer() {
            const nextButton = document.getElementById('nextButton');
            
            if (gameState.currentPlayer < gameState.totalPlayers) {
                nextButton.style.transform = 'translateX(-50%) scale(0.96)';
                setTimeout(() => {
                    nextButton.style.transform = 'translateX(-50%) scale(1)';
                }, 150);
                
                const playerCard = document.getElementById('playerCard');
                playerCard.style.animation = 'cardFlip 0.6s ease-in-out';
                playSound('card-flip');
                vibrate([50]);
                
                nextButton.style.opacity = '0';
                nextButton.style.pointerEvents = 'none';
                nextButton.style.transform = 'translateX(-50%) translateY(20px)';
                
                setTimeout(() => {
                    gameState.currentPlayer++;
                    updateGameDisplay();
                    playerCard.style.animation = '';
                }, 600);
                
            } else {
                nextButton.style.transform = 'translateX(-50%) scale(0.96)';
                nextButton.textContent = 'Spiel startet...';
                
                setTimeout(() => {
                    nextButton.style.transform = 'translateX(-50%) scale(1)';
                    showGameStarted();
                    nextButton.textContent = 'Weitergeben';
                    nextButton.style.opacity = '0';
                    nextButton.style.pointerEvents = 'none';
                    playSound('success');
                    vibrate([100, 50, 100]);
                }, 800);
            }
        }

        function showGameStarted() {
            showScreen('gameStartedScreen');
            updateGameStartedDisplay();
        }

        function updateGameStartedDisplay() {
            gameState.startingPlayer = Math.floor(Math.random() * gameState.totalPlayers) + 1;
            
            const starterName = gameState.playerNames[gameState.startingPlayer - 1] || `Spieler ${gameState.startingPlayer}`;
            const starterText = document.getElementById('starterText');
            starterText.textContent = `${starterName} beginnt`;
            starterText.style.animation = 'pulse 2s infinite';
            
            if (gameState.timerEnabled) {
                gameState.timeLeft = gameState.timerMinutes * 60;
                document.getElementById('timerDisplay').classList.remove('hidden');
                startTimer();
            } else {
                document.getElementById('timerDisplay').classList.add('hidden');
            }
            
            setTimeout(() => {
                starterText.style.animation = 'none';
                starterText.style.fontSize = 'clamp(20px, 5vw, 24px)';
            }, 5000);
        }

        function startTimer() {
            if (gameState.timer) {
                clearInterval(gameState.timer);
            }
            
            updateTimerDisplay();
            gameState.timer = setInterval(() => {
                gameState.timeLeft--;
                updateTimerDisplay();
                
                if (gameState.timeLeft === 10) {
                    vibrate([200, 200, 200]);
                }
                
                if (gameState.timeLeft <= 0) {
                    clearInterval(gameState.timer);
                    gameState.timer = null;
                    vibrate([500, 200, 500]);
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(gameState.timeLeft / 60);
            const seconds = gameState.timeLeft % 60;
            const display = document.getElementById('timerDisplay');
            display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (gameState.timeLeft <= 30) {
                display.style.background = 'rgba(244, 67, 54, 0.8)';
            } else if (gameState.timeLeft <= 60) {
                display.style.background = 'rgba(255, 193, 7, 0.8)';
            }
        }


        

        // Scroll to specific card and update indicators
        function scrollToCard(cardIndex) {
            const container = document.getElementById('gamesContainer');
            const gameCard = container.querySelectorAll('.game-card')[cardIndex];
            if (!gameCard) return;
            
            const cardWidth = gameCard.offsetWidth + 20;
            container.scrollTo({
                left: cardIndex * cardWidth,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                updateCardIndicators();
            }, 100);
        }

        // Update card indicators based on scroll position
        function updateCardIndicators() {
            const container = document.getElementById('gamesContainer');
            const cards = container.querySelectorAll('.game-card');
            
            if (cards.length === 0) return;
            
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            
            let activeIndex = 0;
            let minDistance = Infinity;
            
            cards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(cardCenter - containerCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });
            
            document.querySelectorAll('.snap-dot').forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Settings Menu Functions
        function toggleSettingsMenu() {
            const menu = document.getElementById('settingsMenu');
            menu.classList.toggle('visible');
            updateSettingsDisplay();
            playSound('tap');
        }

        function updateSettingsDisplay() {
            const soundStatus = document.getElementById('soundStatus');
            const vibrationStatus = document.getElementById('vibrationStatus');
            const themeStatus = document.getElementById('themeStatus');
            if (soundStatus) soundStatus.textContent = settings.soundsEnabled ? 'An' : 'Aus';
            if (vibrationStatus) vibrationStatus.textContent = settings.vibrationEnabled ? 'An' : 'Aus';
            if (themeStatus) themeStatus.textContent = settings.lightTheme ? 'Light' : 'Dark';
        }

        function toggleSounds() {
            settings.soundsEnabled = !settings.soundsEnabled;
            updateSettingsDisplay();
            if (settings.soundsEnabled) playSound('tap');
            toggleSettingsMenu();
        }

        function toggleVibration() {
            settings.vibrationEnabled = !settings.vibrationEnabled;
            updateSettingsDisplay();
            vibrate([50]);
            playSound('tap');
            toggleSettingsMenu();
        }

        function toggleTheme() {
            settings.lightTheme = !settings.lightTheme;
            document.body.classList.toggle('light-theme', settings.lightTheme);
            updateSettingsDisplay();
            playSound('tap');
            toggleSettingsMenu();
        }

        function showStatsModal() {
            toggleSettingsMenu();
            const totalGames = playerStats.gamesPlayed;
            const averageGameTime = playerStats.totalPlayTime > 0 ? 
                Math.round(playerStats.totalPlayTime / playerStats.gamesPlayed) + 's' : 'N/A';
            
            const content = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                    <div style="background: rgba(44, 44, 48, 0.95); border-radius: 20px; padding: 20px; text-align: center; color: white;">
                        <div style="font-size: clamp(28px, 7vw, 36px); font-weight: 800;">${totalGames}</div>
                        <div style="font-size: clamp(12px, 3vw, 14px); opacity: 0.9; margin-top: 8px;">Spiele gespielt</div>
                    </div>
                    <div style="background: rgba(44, 44, 48, 0.95); border-radius: 20px; padding: 20px; text-align: center; color: white;">
                        <div style="font-size: clamp(28px, 7vw, 36px); font-weight: 800;">${averageGameTime}</div>
                        <div style="font-size: clamp(12px, 3vw, 14px); opacity: 0.9; margin-top: 8px;">⌀ Spielzeit</div>
                    </div>
                    <div style="background: rgba(44, 44, 48, 0.95); border-radius: 20px; padding: 20px; text-align: center; color: white;">
                        <div style="font-size: clamp(28px, 7vw, 36px); font-weight: 800;">${playerStats.fastestGame || 'N/A'}</div>
                        <div style="font-size: clamp(12px, 3vw, 14px); opacity: 0.9; margin-top: 8px;">Schnellstes Spiel</div>
                    </div>
                    <div style="background: rgba(44, 44, 48, 0.95); border-radius: 20px; padding: 20px; text-align: center; color: white;">
                        <div style="font-size: clamp(28px, 7vw, 36px); font-weight: 800;">${APP_VERSION}</div>
                        <div style="font-size: clamp(12px, 3vw, 14px); opacity: 0.9; margin-top: 8px;">App Version</div>
                    </div>
                </div>
            `;
            showModal('📊 Deine Statistiken', content);
        }

        function showHistoryModal() {
            toggleSettingsMenu();
            let content = '<div style="max-height: 300px; overflow-y: auto;">';
            
            if (gameHistory.length === 0) {
                content += '<p style="text-align: center; opacity: 0.7; font-size: 16px; padding: 40px 0;">Noch keine Spiele gespielt</p>';
            } else {
                const recentGames = gameHistory.slice(-10).reverse();
                recentGames.forEach((game) => {
                    const date = new Date(game.date).toLocaleDateString('de-DE');
                    const timeOfDay = new Date(game.date).toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
                    
                    content += `
                        <div style="background: rgba(44, 44, 48, 0.95); border-radius: 20px; padding: 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; color: white;">
                            <div>
                                <strong style="font-size: 16px;">${game.word}</strong><br>
                                <small style="color: rgba(255,255,255,0.6); font-size: 13px;">${date} ${timeOfDay} • ${game.players} Spieler • ${game.duration}</small>
                            </div>
                            <div style="font-size: 24px;">🎭</div>
                        </div>
                    `;
                });
            }
            
            content += '</div>';
            showModal('📚 Spiel-Historie', content);
        }

        function showAchievementsModal() {
            toggleSettingsMenu();
            let content = '<div style="max-height: 300px; overflow-y: auto;">';
            
            Object.keys(ACHIEVEMENTS).forEach(key => {
                const achievement = ACHIEVEMENTS[key];
                const unlocked = achievements[key] || false;
                content += `
                    <div style="background: rgba(44, 44, 48, 0.95); border-radius: 20px; padding: 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; color: white; ${unlocked ? 'border: 2px solid #4CAF50;' : ''}">
                        <div style="display: flex; align-items: center;">
                            <span style="font-size: 28px; margin-right: 16px;">${achievement.icon}</span>
                            <div>
                                <strong style="font-size: 16px;">${achievement.name}</strong><br>
                                <small style="color: rgba(255,255,255,0.6); font-size: 13px;">${achievement.description}</small>
                            </div>
                        </div>
                        <div style="font-size: 20px;">${unlocked ? '✅' : '❌'}</div>
                    </div>
                `;
            });
            
            content += '</div>';
            showModal('🏆 Erfolge', content);
        }

        function showInstallModal() {
            toggleSettingsMenu();
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            let content = `
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.5;">
                        Installiere Party Games als App auf deinem Gerät für die beste Erfahrung!
                    </p>
                </div>
            `;
            
            if (isIOS) {
                content += `
                    <div style="background: #1c1c1e; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
                        <h3 style="margin-bottom: 16px; color: white;">📱 iOS Installation:</h3>
                        <ol style="color: rgba(255,255,255,0.8); line-height: 1.6; padding-left: 20px;">
                            <li>Tippe auf das <strong>Teilen-Symbol</strong> 📤 in Safari</li>
                            <li>Scrolle nach unten und wähle <strong>"Zum Home-Bildschirm"</strong></li>
                            <li>Tippe auf <strong>"Hinzufügen"</strong> in der oberen rechten Ecke</li>
                            <li>Die App erscheint jetzt auf deinem Home-Bildschirm! 🎉</li>
                        </ol>
                    </div>
                `;
            } else if (isAndroid) {
                content += `
                    <div style="background: #1c1c1e; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
                        <h3 style="margin-bottom: 16px; color: white;">🤖 Android Installation:</h3>
                        <ol style="color: rgba(255,255,255,0.8); line-height: 1.6; padding-left: 20px;">
                            <li>Tippe auf das <strong>Menü-Symbol</strong> ⋮ in Chrome</li>
                            <li>Wähle <strong>"App installieren"</strong> oder <strong>"Zum Startbildschirm hinzufügen"</strong></li>
                            <li>Bestätige mit <strong>"Installieren"</strong></li>
                            <li>Die App ist jetzt in deinen Apps verfügbar! 🎉</li>
                        </ol>
                    </div>
                `;
            } else {
                content += `
                    <div style="background: #1c1c1e; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
                        <h3 style="margin-bottom: 16px; color: white;">💻 Desktop Installation:</h3>
                        <ol style="color: rgba(255,255,255,0.8); line-height: 1.6; padding-left: 20px;">
                            <li>Klicke auf das <strong>Install-Symbol</strong> in der Adressleiste</li>
                            <li>Oder: Menü → <strong>"Party Games installieren"</strong></li>
                            <li>Bestätige die Installation</li>
                            <li>Die App ist jetzt als eigenständige App verfügbar! 🎉</li>
                        </ol>
                    </div>
                `;
            }
            
            showModal('📱 App installieren', content);
        }

        function showComingSoonModal() {
            toggleSettingsMenu();
            
            const content = `
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🚀</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.5;">
                        Kommende Features für Party Games - Sei gespannt!
                    </p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="background: #1c1c1e; border-radius: 16px; padding: 16px; margin-bottom: 12px; color: white;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                            <span style="font-size: 24px;">🎯</span>
                            <strong style="font-size: 16px;">Neue Spiele</strong>
                        </div>
                        <div style="font-size: 14px; opacity: 0.9;">
                            • Wahrheit oder Pflicht<br>
                            • Wer bin ich?<br>
                            • Story Builder<br>
                            • Schnelles Denken
                        </div>
                    </div>
                    
                    <div style="background: #1c1c1e; border-radius: 16px; padding: 16px; margin-bottom: 12px; color: white;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                            <span style="font-size: 24px;">⚡</span>
                            <strong style="font-size: 16px;">Neue Features</strong>
                        </div>
                        <div style="font-size: 14px; opacity: 0.9;">
                            • Multiplayer-Modus<br>
                            • Eigene Wortlisten<br>
                            • Teams & Turniere<br>
                            • Audio-Hinweise
                        </div>
                    </div>
                </div>
            `;
            
            showModal('🚀 Coming Soon', content);
        }

        function showInfoModal() {
            const content = `
                <div style="text-align: center; margin-bottom: 28px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🎮</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.5;">
                        Die ultimative Party-App für unvergessliche Momente mit deinen Freunden!
                    </p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <div style="background: #1c1c1e; border-radius: 20px; padding: 20px; margin-bottom: 16px; color: white;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                            <span style="font-size: 24px;">⚡</span>
                            <strong style="font-size: 17px;">Features</strong>
                        </div>
                        <div style="font-size: 15px; opacity: 0.95; line-height: 1.6;">
                            • Komplett offline spielbar<br>
                            • Responsive für alle Geräte<br>
                            • Keine Registrierung erforderlich<br>
                            • Kostenlos & werbefrei<br>
                            • Über ${CATEGORY_INFO.alle.count} Impostor-Wörter + ${Object.keys(WER_WUERDE_QUESTIONS).length} Kategorien "Wer würde eher"<br>
                            • 🔞 Adults Only verfügbar für "Wer würde eher"
                        </div>
                    </div>
                    
                    <div style="background: #1c1c1e; border-radius: 20px; padding: 20px; color: white;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                            <span style="font-size: 24px;">🎯</span>
                            <strong style="font-size: 17px;">So einfach geht's</strong>
                        </div>
                        <div style="font-size: 15px; opacity: 0.95; line-height: 1.6;">
                            1. Spiel auswählen & Einstellungen anpassen<br>
                            2. Gerät an alle Mitspieler weitergeben<br>
                            3. Jeder schaut sich seine Rolle an<br>
                            4. Spielen & Spaß haben!
                        </div>
                    </div>
                </div>
                
                <div style="background: #1c1c1e; border-radius: 16px; padding: 18px; text-align: center; border: 1px solid rgba(255,255,255,0.08);">
                    <div style="font-size: 15px; color: white; font-weight: 600;">
                        Version ${APP_VERSION}
                    </div>
                    <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 4px;">
                        Regelmäßige Updates mit neuen Spielen
                    </div>
                </div>
            `;
            
            showModal('App Info', content);
        }

        // Modal Functions
        function showModal(title, content) {
            const modalBody = document.getElementById('modalBody');
            if (modalBody) {
                modalBody.innerHTML = `<h2 style="font-size: clamp(26px, 6.5vw, 34px); font-weight: 700; margin-bottom: 24px; text-align: center; color: white;">${title}</h2>${content}`;
                document.getElementById('modalOverlay').classList.add('visible');
            }
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('visible');
        }

        // Achievement Functions
        function checkAchievements() {
            let newAchievements = [];
            
            if (!achievements.firstGame && playerStats.gamesPlayed >= 1) {
                achievements.firstGame = true;
                newAchievements.push(ACHIEVEMENTS.firstGame);
            }
            
            if (!achievements.veteran && playerStats.gamesPlayed >= 25) {
                achievements.veteran = true;
                newAchievements.push(ACHIEVEMENTS.veteran);
            }
            
            if (!achievements.dedicated && playerStats.gamesPlayed >= 100) {
                achievements.dedicated = true;
                newAchievements.push(ACHIEVEMENTS.dedicated);
            }
            
            if (newAchievements.length > 0) {
                showAchievementNotification(newAchievements);
            }
        }

        function showAchievementNotification(newAchievements) {
            newAchievements.forEach((achievement, index) => {
                setTimeout(() => {
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        background: #1c1c1e;
                        color: white;
                        padding: 16px 20px;
                        border-radius: 20px;
                        font-weight: 600;
                        z-index: 10000;
                        animation: slideInFromRight 0.5s ease-out;
                        max-width: 300px;
                        box-shadow: 0 16px 40px rgba(0,0,0,0.2);
                        backdrop-filter: blur(10px);
                        border: 2px solid #4CAF50;
                    `;
                    
                    notification.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 28px;">${achievement.icon}</span>
                            <div>
                                <div style="font-size: 16px; font-weight: 700;">Erfolg freigeschaltet!</div>
                                <div style="font-size: 14px; opacity: 0.8;">${achievement.name}</div>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(notification);
                    playSound('success');
                    vibrate([100, 50, 100]);
                    
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 3000);
                }, index * 500);
            });
        }

        // Initialize
        function initialize() {
            initializePlayerNames();
            gameState.selectedCategories = ['alle'];
            werWuerdeState.selectedCategories = ['klassisch'];
            
            updateGameSettingsDisplay();
            updateWerWuerdeSettingsDisplay();
            updateSettingsDisplay();
            
            const gamesContainer = document.getElementById('gamesContainer');
            if (gamesContainer) {
                gamesContainer.addEventListener('scroll', updateCardIndicators);
                setTimeout(updateCardIndicators, 100);
            }
            
            if (settings.lightTheme) {
                document.body.classList.add('light-theme');
            }
            
            showScreen('modeSelectScreen');
        }

        // Event Listeners
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.settings-menu') && 
                !event.target.closest('.settings-icon') && 
                !event.target.closest('.categories-modal') &&
                !event.target.closest('.setting-icon')) {
                const settingsMenu = document.getElementById('settingsMenu');
                if (settingsMenu) settingsMenu.classList.remove('visible');
            }
        });

        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize);
        } else {
            initialize();
        }
