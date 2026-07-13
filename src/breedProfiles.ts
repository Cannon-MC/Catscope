import { BreedDetail } from "./types";

export const BREED_PROFILES: Record<string, BreedDetail> = {
  ragdoll: {
    breedName: "Ragdoll",
    shortDescription: "Gentle, affectionate, and famously docile lap cats.",
    origin: "United States",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Ragdoll is one of the largest domesticated cat breeds, famous for its striking blue eyes, soft colorpoint coat, and famously sweet temperament. First developed in California in the 1960s, these cats are named for their tendency to go entirely limp and relaxed when held.",
      "They are exceptionally docile and affectionate, often following their owners from room to room. Their soft-spoken voice and calm nature make them an absolute favorite for families seeking a peaceful indoor companion."
    ],
    topTraits: [
      { name: "Affectionate", icon: "heart" },
      { name: "Placid/Docile", icon: "smile" },
      { name: "Kid Friendly", icon: "baby" }
    ],
    pros: [
      "Extremely gentle and safe with small children",
      "Very low aggression, adapts easily to multi-pet homes",
      "Quiet, sweet-voiced and loves physical contact",
      "Highly social and acts like a puppy companion"
    ],
    cons: [
      "Prone to weight gain if diet is not monitored",
      "Strictly an indoor cat due to their trusting nature",
      "Sheds seasonally and requires regular brushing",
      "Requires constant attention and hates being lonely"
    ],
    healthAndCare: [
      { title: "Grooming Routine", description: "Twice-weekly brushing is recommended to maintain their silky coat and avoid knots." },
      { title: "HCM Watch", description: "Regular screening for Hypertrophic Cardiomyopathy (HCM) is recommended for senior Ragdolls." },
      { title: "Weight Guidance", description: "Keep them active using laser toys or feather wands as they tend to lounge all day." }
    ],
    funFact: "Ragdoll kittens are born completely pure white! Their colored point markings slowly develop over the first few weeks and take up to 4 years to reach full color."
  },
  bengal: {
    breedName: "Bengal",
    shortDescription: "A wild-looking leopard-patterned athlete with high intelligence.",
    origin: "United States",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Bengal is a highly active and exotic breed created by crossing the Asian Leopard Cat with domestic cats. They boast a majestic, glittery coat with distinct leopard-like rosettes, muscular builds, and incredibly athletic movements.",
      "Bengals are highly intelligent and curious, often showing a unique fascination with water. They thrive in active households where they receive plenty of play, mental stimulation, and climbing space."
    ],
    topTraits: [
      { name: "Active", icon: "zap" },
      { name: "High IQ", icon: "brain" },
      { name: "Water Loving", icon: "droplet" }
    ],
    pros: [
      "Extremely energetic, playful, and interactive",
      "Hypoallergenic qualities with low shedding",
      "Highly trainable (can walk on a leash and fetch)",
      "Striking, unique wild leopard appearance"
    ],
    cons: [
      "Needs hours of active play daily or can get destructive",
      "Highly vocal, demanding your full attention",
      "Will climb onto any cabinet, shelf, or door frame",
      "High prey drive — may stalk birds or fish tanks"
    ],
    healthAndCare: [
      { title: "Climbing Environment", description: "Provide tall cat trees or wall shelves. Bengals must observe their kingdom from high up." },
      { title: "Hydration Play", description: "Give them access to dripping taps or water fountains; they absolutely love playing with water." },
      { title: "Mental Stim", description: "Use interactive puzzle toys or clicker training to satisfy their sharp, curious minds." }
    ],
    funFact: "Bengals have a 'glitter gene' that gives their fur a beautiful, iridescent sheen, making them look as if they've been dusted in gold or silver under the sun!"
  },
  mainecoon: {
    breedName: "Maine Coon",
    shortDescription: "Known as the 'dogs of the cat world,' they are gentle giants.",
    origin: "North America",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Maine Coon is one of the largest domesticated cat breeds. It has a distinctive physical appearance with a massive, sturdy body, tufted ears like a lynx, and a magnificent bushy tail. Native to the state of Maine, it is the official state cat and a legendary winter survivalist.",
      "Their temperament is famously social and warm; they are cats that want to be right where the action is. Unlike many breeds, they often enjoy water, are highly trainable, and are known for their sweet, melodious chirping vocals."
    ],
    topTraits: [
      { name: "Gentle", icon: "heart" },
      { name: "High IQ", icon: "brain" },
      { name: "Kid Friendly", icon: "baby" }
    ],
    pros: [
      "Extremely loyal, loving, and people-oriented",
      "Excellent with other pets, dogs, and children",
      "Robust and sturdy constitution, highly adaptable",
      "Very vocal with cute expressive chirps and trills"
    ],
    cons: [
      "Requires significant grooming and regular detangling",
      "Prone to certain genetic issues like hip dysplasia",
      "Higher food, litter, and larger accessory costs",
      "Needs plenty of vertical and horizontal physical space"
    ],
    healthAndCare: [
      { title: "Grooming Routine", description: "Daily brushing is recommended to prevent matting of their thick, water-resistant double coat." },
      { title: "Cardiac Watch", description: "Be aware of HCM (Hypertrophic Cardiomyopathy), a common heart condition in this giant breed." },
      { title: "Hip Health", description: "Due to their heavy size, hip dysplasia is more common. Keep their weight carefully managed." }
    ],
    funFact: "Maine Coons have 'snowshoe' paws — huge, tufted feet that help them navigate deep winter snow easily! They are built naturally for the rugged, freezing cold wilderness."
  },
  siamese: {
    breedName: "Siamese",
    shortDescription: "Elegant, vocal, and deeply devoted to their people.",
    origin: "Thailand",
    lifespan: "12-20 Years",
    breedProfile: [
      "The Siamese is one of the oldest and most recognizable cat breeds, famous for its striking blue almond-shaped eyes, pointed coat pattern, and sleek, slender body. Originating in Thailand (formerly Siam), they were once sacred temple cats reserved for royalty.",
      "Siamese cats are extremely social, intelligent, and vocal. They form strong bonds with their owners and will follow you around the house, chatting in their distinctive, loud voice to share their opinions on everything."
    ],
    topTraits: [
      { name: "Vocal", icon: "volume-2" },
      { name: "Intelligent", icon: "brain" },
      { name: "Affectionate", icon: "heart" }
    ],
    pros: [
      "Highly interactive and communicative companion",
      "Very intelligent and easy to train",
      "Forms deep bonds with family members",
      "Low-shedding short coat is easy to groom"
    ],
    cons: [
      "Can be loudly demanding when ignored",
      "Prone to separation anxiety if left alone",
      "Needs lots of mental stimulation and attention",
      "May be territorial with unfamiliar pets"
    ],
    healthAndCare: [
      { title: "Dental Care", description: "Regular dental cleanings help prevent periodontal disease, which Siamese can be prone to." },
      { title: "Mental Enrichment", description: "Puzzle toys and clicker training keep their brilliant minds engaged." },
      { title: "Companion Time", description: "They thrive on company; consider a feline friend if you work long hours." }
    ],
    funFact: "Siamese cats are temperature-sensitive albinos! Their cooler extremities (ears, nose, paws, tail) develop darker pigment, creating their famous points."
  },
  persian: {
    breedName: "Persian",
    shortDescription: "A calm, luxurious lap cat with a sweet expression.",
    origin: "Persia (Iran)",
    lifespan: "12-17 Years",
    breedProfile: [
      "The Persian is the epitome of feline elegance, with its long, flowing coat, round face, and gentle temperament. One of the oldest and most popular pedigree breeds, Persians prefer a serene, predictable environment where they can lounge gracefully.",
      "These cats are quiet, affectionate, and undemanding. They love being pampered and brushed, and they are perfectly content to spend their days as decorative, loving companions on a soft cushion."
    ],
    topTraits: [
      { name: "Calm", icon: "smile" },
      { name: "Affectionate", icon: "heart" },
      { name: "Gentle", icon: "baby" }
    ],
    pros: [
      "Sweet, peaceful, and easygoing nature",
      "Loves cuddles and quiet companionship",
      "Beautiful, luxurious long coat",
      "Adaptable to indoor apartment living"
    ],
    cons: [
      "Requires daily grooming to prevent matting",
      "Flat face can cause breathing and tear issues",
      "Not very playful or active",
      "Coat sheds heavily and needs professional care"
    ],
    healthAndCare: [
      { title: "Daily Brushing", description: "Their long coat mats quickly; daily combing is essential for coat health." },
      { title: "Eye Cleaning", description: "Wipe away tear stains daily to prevent skin irritation under the eyes." },
      { title: "Weight Watch", description: "Persians are prone to obesity; monitor portions and encourage gentle play." }
    ],
    funFact: "Persians have been one of the most popular cat breeds in America for over a century, and their placid demeanor has made them a favorite in movies and cat shows."
  },
  sphynx: {
    breedName: "Sphynx",
    shortDescription: "Hairless, wrinkled, and surprisingly warm-hearted.",
    origin: "Canada",
    lifespan: "12-14 Years",
    breedProfile: [
      "The Sphynx is instantly recognizable for its hairless body, wrinkled skin, and oversized ears. Despite their alien appearance, Sphynx cats are incredibly affectionate, playful, and people-oriented companions.",
      "Because they lack fur, Sphynx cats feel warm and velvety to the touch. They are notorious for seeking out heat sources and human laps, making them the ultimate snuggle buddies."
    ],
    topTraits: [
      { name: "Affectionate", icon: "heart" },
      { name: "Playful", icon: "zap" },
      { name: "Social", icon: "smile" }
    ],
    pros: [
      "Extremely loving and people-focused",
      "No shedding or fur allergies for many people",
      "Funny, clownish personality",
      "Very intelligent and trainable"
    ],
    cons: [
      "Needs regular bathing to remove skin oils",
      "Sensitive to cold and sunburn",
      "Requires frequent ear cleaning",
      "Can develop skin issues without proper care"
    ],
    healthAndCare: [
      { title: "Weekly Baths", description: "Bathe weekly to remove oily buildup that would normally be absorbed by fur." },
      { title: "Sun Protection", description: "Limit sun exposure to prevent sunburn; keep them warm in cold weather." },
      { title: "Ear Cleaning", description: "Clean ears regularly since wax buildup is visible without fur." }
    ],
    funFact: "Despite their bald look, Sphynx cats aren't actually completely hairless — many have a fine peach-fuzz coat that feels like suede."
  },
  abyssinian: {
    breedName: "Abyssinian",
    shortDescription: "A curious, athletic explorer with a ticked coat.",
    origin: "Ethiopia / Southeast Asia",
    lifespan: "13-15 Years",
    breedProfile: [
      "The Abyssinian is one of the oldest known cat breeds, famous for its ticked tabby coat that resembles wild cats. With their muscular build, alert ears, and curious nature, Abyssinians are always on the move.",
      "These cats are highly active, intelligent, and inquisitive. They love to climb, explore, and observe their surroundings from high perches. Abyssinians are not typical lap cats but form strong bonds through play."
    ],
    topTraits: [
      { name: "Active", icon: "zap" },
      { name: "Curious", icon: "brain" },
      { name: "Athletic", icon: "heart" }
    ],
    pros: [
      "Highly intelligent and engaging",
      "Low-maintenance short coat",
      "Great for active households",
      "Sociable with people and other pets"
    ],
    cons: [
      "Needs lots of exercise and stimulation",
      "Can be mischievous when bored",
      "Not a cuddly lap cat",
      "May get into everything if unsupervised"
    ],
    healthAndCare: [
      { title: "Climbing Spaces", description: "Provide tall cat trees and shelves for their love of vertical exploration." },
      { title: "Interactive Play", description: "Daily active play sessions satisfy their high energy and hunting instincts." },
      { title: "Dental Health", description: "Regular dental care helps prevent gum disease common in the breed." }
    ],
    funFact: "Abyssinians are often called the 'Clowns of the Cat Kingdom' because of their playful antics and endless curiosity."
  },
  britishshorthair: {
    breedName: "British Shorthair",
    shortDescription: "Easygoing, round-faced, and wonderfully calm.",
    origin: "United Kingdom",
    lifespan: "12-17 Years",
    breedProfile: [
      "The British Shorthair is the teddy bear of the cat world, with a round face, dense plush coat, and stocky build. Originally bred as working mousers, they have evolved into affectionate, easygoing companions.",
      "These cats are famously calm and undemanding. They enjoy company but are also happy to entertain themselves, making them excellent pets for busy households."
    ],
    topTraits: [
      { name: "Calm", icon: "smile" },
      { name: "Loyal", icon: "heart" },
      { name: "Independent", icon: "brain" }
    ],
    pros: [
      "Relaxed and adaptable temperament",
      "Good with children and other pets",
      "Doesn't demand constant attention",
      "Dense coat is surprisingly low-maintenance"
    ],
    cons: [
      "Can be prone to obesity",
      "Sheds heavily during seasonal changes",
      "Not overly cuddly or lap-oriented",
      "Can be reserved with strangers"
    ],
    healthAndCare: [
      { title: "Weight Control", description: "Monitor food intake carefully as they easily gain weight." },
      { title: "Grooming", description: "Weekly brushing keeps their dense coat healthy and reduces shedding." },
      { title: "Heart Screening", description: "Screen for HCM, which can occur in this breed." }
    ],
    funFact: "The famous Cheshire Cat from Alice in Wonderland was inspired by the British Shorthair's charming, round-faced grin."
  },
  scottishfold: {
    breedName: "Scottish Fold",
    shortDescription: "Sweet-natured cats with signature folded ears.",
    origin: "Scotland",
    lifespan: "11-14 Years",
    breedProfile: [
      "The Scottish Fold is best known for its unique folded ears, which give it an owl-like appearance. They have round faces, large eyes, and a sweet, gentle expression that matches their temperament.",
      "Scottish Folds are adaptable, affectionate, and love being with their people. They often sit in amusing positions, including the famous 'Buddha sit' with their paws resting on their belly."
    ],
    topTraits: [
      { name: "Sweet", icon: "heart" },
      { name: "Adaptable", icon: "smile" },
      { name: "Playful", icon: "zap" }
    ],
    pros: [
      "Gentle and good with families",
      "Adaptable to many living situations",
      "Quiet and not overly demanding",
      "Loves interactive play"
    ],
    cons: [
      "Folded ears require genetic care to avoid cartilage issues",
      "Can develop osteochondrodysplasia",
      "Needs regular ear checks",
      "Should not be bred fold-to-fold"
    ],
    healthAndCare: [
      { title: "Joint Health", description: "Choose ethical breeders and monitor for stiffness or lameness." },
      { title: "Ear Checks", description: "Inspect ears regularly since the fold can trap debris." },
      { title: "Active Play", description: "Encourage gentle play to maintain a healthy weight." }
    ],
    funFact: "All Scottish Fold cats can trace their ancestry back to a white barn cat named Susie, born in Scotland in 1961."
  },
  norwegianforest: {
    breedName: "Norwegian Forest",
    shortDescription: "A majestic, weatherproof climber from the forests of Norway.",
    origin: "Norway",
    lifespan: "14-16 Years",
    breedProfile: [
      "The Norwegian Forest Cat is a large, muscular breed with a thick double coat, tufted ears, and a bushy tail. Built for harsh Scandinavian winters, these cats are excellent climbers and hunters.",
      "Despite their wild appearance, Norwegian Forest Cats are friendly, gentle, and affectionate. They enjoy climbing to high vantage points and observing their domain but are also happy to curl up with their family."
    ],
    topTraits: [
      { name: "Majestic", icon: "heart" },
      { name: "Athletic", icon: "zap" },
      { name: "Friendly", icon: "smile" }
    ],
    pros: [
      "Beautiful semi-long coat with minimal matting",
      "Friendly and good with children",
      "Loves climbing and outdoor-safe enclosures",
      "Generally robust and healthy"
    ],
    cons: [
      "Seasonal shedding is significant",
      "Needs regular brushing",
      "Requires vertical space and climbing opportunities",
      "Can be reserved with strangers"
    ],
    healthAndCare: [
      { title: "Coat Maintenance", description: "Brush twice weekly, more often during seasonal coat blows." },
      { title: "Climbing Trees", description: "Provide sturdy tall trees and shelves for their athletic nature." },
      { title: "Heart Health", description: "Screen for HCM as a preventive measure." }
    ],
    funFact: "In Norse mythology, the Norwegian Forest Cat was said to be so skilled at climbing that it was once considered too bold to be kept indoors."
  },
  russianblue: {
    breedName: "Russian Blue",
    shortDescription: "Shy, elegant, and famously hypoallergenic.",
    origin: "Russia",
    lifespan: "15-20 Years",
    breedProfile: [
      "The Russian Blue is a striking breed with a short, silvery-blue coat, emerald-green eyes, and a slender, graceful build. Their plush double coat stands out from the body, giving them a soft, shimmering appearance.",
      "Russian Blues are gentle, reserved, and loyal to their chosen people. They are often shy with strangers but form deep, devoted bonds with their families. They are also known for producing less of the Fel d 1 allergen."
    ],
    topTraits: [
      { name: "Elegant", icon: "heart" },
      { name: "Loyal", icon: "smile" },
      { name: "Quiet", icon: "volume-2" }
    ],
    pros: [
      "Often tolerated by allergy sufferers",
      "Intelligent and easy to train",
      "Gentle and good with respectful children",
      "Low-shedding, easy-care coat"
    ],
    cons: [
      "Can be shy or aloof with strangers",
      "Needs time to adjust to new environments",
      "Doesn't like loud or chaotic households",
      "Can be sensitive to changes in routine"
    ],
    healthAndCare: [
      { title: "Grooming", description: "Weekly brushing keeps their dense coat sleek and reduces loose fur." },
      { title: "Stress Management", description: "Provide quiet spaces and gradual introductions to reduce anxiety." },
      { title: "Dental Care", description: "Regular dental checkups help maintain overall health." }
    ],
    funFact: "Russian Blues are thought to have been the favored cats of Russian czars and were historically believed to bring good luck."
  },
  savannah: {
    breedName: "Savannah",
    shortDescription: "An exotic, athletic hybrid with a wild spirit.",
    origin: "United States",
    lifespan: "12-20 Years",
    breedProfile: [
      "The Savannah is a hybrid breed created by crossing domestic cats with the African Serval. They are tall, lean, and incredibly athletic, with large ears, long legs, and spotted coats that give them a wild appearance.",
      "Savannahs are highly intelligent, energetic, and adventurous. They often enjoy playing in water, walking on leashes, and learning tricks. They need lots of space, stimulation, and interaction."
    ],
    topTraits: [
      { name: "Athletic", icon: "zap" },
      { name: "Intelligent", icon: "brain" },
      { name: "Adventurous", icon: "heart" }
    ],
    pros: [
      "Stunning exotic appearance",
      "Highly trainable and dog-like",
      "Loves water and interactive play",
      "Can learn to walk on a leash"
    ],
    cons: [
      "Requires lots of space and activity",
      "Can be destructive if bored",
      "Not legal in all areas",
      "Early generations can be very high-energy"
    ],
    healthAndCare: [
      { title: "Enrichment", description: "Provide puzzle toys, leash walks, and high climbing structures." },
      { title: "Diet", description: "High-quality protein-rich diet supports their active metabolism." },
      { title: "Legal Awareness", description: "Check local laws before adopting early-generation Savannahs." }
    ],
    funFact: "Savannah cats can leap up to 8 feet in the air from a standing position, thanks to their long legs and powerful muscles."
  },
  birman: {
    breedName: "Birman",
    shortDescription: "Silky, color-pointed cats with white gloves.",
    origin: "Myanmar (Burma)",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Birman is a beautiful color-pointed breed with deep blue eyes, a silky medium-long coat, and distinctive white 'gloves' on all four paws. They are gentle, affectionate, and known as the 'Sacred Cat of Burma.'",
      "Birmans are calm, social, and quietly devoted. They enjoy being near their people without being demanding, making them wonderful companions for relaxed households."
    ],
    topTraits: [
      { name: "Gentle", icon: "heart" },
      { name: "Devoted", icon: "smile" },
      { name: "Soft", icon: "baby" }
    ],
    pros: [
      "Sweet and affectionate temperament",
      "Silky coat that doesn't mat easily",
      "Good with children and other pets",
      "Quiet and undemanding"
    ],
    cons: [
      "Can be prone to obesity",
      "Prefers company and may be lonely alone",
      "Sheds moderately year-round",
      "Needs regular brushing"
    ],
    healthAndCare: [
      { title: "Coat Care", description: "Brush twice weekly to keep their silky coat tangle-free." },
      { title: "Weight Control", description: "Monitor portions to prevent weight gain." },
      { title: "Companionship", description: "They thrive with people or other pets around." }
    ],
    funFact: "Legend says Birmans got their white paws when a temple cat touched its feet to its fallen master's body in mourning."
  },
  orientalshorthair: {
    breedName: "Oriental Shorthair",
    shortDescription: "Sleek, chatty, and full of personality.",
    origin: "Thailand / United Kingdom",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Oriental Shorthair is a close relative of the Siamese, sharing the same slender body, large ears, and outgoing personality. They come in hundreds of colors and patterns, making each one unique.",
      "Orientals are extremely social, vocal, and entertaining. They bond deeply with their families and will happily narrate their day with a wide range of meows, chirps, and purrs."
    ],
    topTraits: [
      { name: "Vocal", icon: "volume-2" },
      { name: "Social", icon: "smile" },
      { name: "Playful", icon: "zap" }
    ],
    pros: [
      "Huge personality in a sleek package",
      "Very affectionate and people-oriented",
      "Intelligent and trainable",
      "Comes in endless colors and patterns"
    ],
    cons: [
      "Can be loud and demanding",
      "Hates being left alone",
      "Needs constant stimulation",
      "Can be clingy with owners"
    ],
    healthAndCare: [
      { title: "Dental Care", description: "Regular dental cleanings help prevent periodontal disease." },
      { title: "Mental Stimulation", description: "Rotate toys and teach tricks to keep them engaged." },
      { title: "Social Time", description: "Spend quality time daily or provide a companion pet." }
    ],
    funFact: "Oriental Shorthairs have one of the largest color palettes of any breed — over 300 recognized color and pattern combinations!"
  },
  devonrex: {
    breedName: "Devon Rex",
    shortDescription: "Pixie-faced, curly-coated, and mischievous.",
    origin: "United Kingdom",
    lifespan: "12-17 Years",
    breedProfile: [
      "The Devon Rex has an elfin appearance with large ears, high cheekbones, and a soft, wavy coat. Their playful, clownish personality has earned them the nickname 'pixie of the cat world.'",
      "Devon Rex cats are highly active, affectionate, and intelligent. They love to play, climb, and be involved in whatever their humans are doing. Many learn tricks and enjoy riding on shoulders."
    ],
    topTraits: [
      { name: "Playful", icon: "zap" },
      { name: "Affectionate", icon: "heart" },
      { name: "Unique", icon: "smile" }
    ],
    pros: [
      "Low-shedding, wavy coat",
      "Funny, entertaining personality",
      "Loves people and other pets",
      "Very intelligent and trainable"
    ],
    cons: [
      "Needs regular ear cleaning",
      "Can be prone to skin oil buildup",
      "Gets cold easily due to thin coat",
      "Needs lots of attention and play"
    ],
    healthAndCare: [
      { title: "Ear Cleaning", description: "Clean ears regularly to prevent wax buildup." },
      { title: "Warmth", description: "Provide warm beds and sweaters in cooler weather." },
      { title: "Playtime", description: "Daily interactive play satisfies their high energy." }
    ],
    funFact: "Devon Rex cats have famously mischievous habits, including learning to open doors, cabinets, and even turning on faucets."
  },
  cornishrex: {
    breedName: "Cornish Rex",
    shortDescription: "Athletic, elegant, and covered in soft waves.",
    origin: "United Kingdom",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Cornish Rex is a slender, athletic breed with a distinctive curly coat, large ears, and an arched back. Their coat is incredibly soft and lacks the outer guard hairs found in most cats.",
      "Cornish Rex cats are active, friendly, and love to be the center of attention. They retain a kitten-like playfulness well into adulthood and are known for their acrobatic leaps."
    ],
    topTraits: [
      { name: "Athletic", icon: "zap" },
      { name: "Affectionate", icon: "heart" },
      { name: "Elegant", icon: "smile" }
    ],
    pros: [
      "Very soft, low-shedding coat",
      "Playful and entertaining",
      "People-oriented and social",
      "Excellent jumper and climber"
    ],
    cons: [
      "Sensitive to cold temperatures",
      "Needs regular bathing",
      "Can be prone to skin issues",
      "Needs lots of activity"
    ],
    healthAndCare: [
      { title: "Skin Care", description: "Occasional baths help manage skin oil." },
      { title: "Warmth", description: "Keep them cozy; they chill easily." },
      { title: "Exercise", description: "Provide climbing and jumping opportunities." }
    ],
    funFact: "The Cornish Rex's curly coat is the result of a natural mutation first discovered in Cornwall, England, in the 1950s."
  },
  himalayan: {
    breedName: "Himalayan",
    shortDescription: "A Persian-Siamese blend with stunning blue eyes.",
    origin: "United States",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Himalayan, also known as the Himmie, is a cross between the Persian and Siamese. They have the Persian's luxurious long coat and the Siamese's color-point pattern and striking blue eyes.",
      "Himalayans are calm, gentle, and affectionate. They enjoy a relaxed lifestyle and are happiest in quiet homes where they can be pampered and loved."
    ],
    topTraits: [
      { name: "Calm", icon: "smile" },
      { name: "Beautiful", icon: "heart" },
      { name: "Sweet", icon: "baby" }
    ],
    pros: [
      "Stunning color-point appearance",
      "Gentle and loving temperament",
      "Enjoys quiet companionship",
      "Good indoor apartment cat"
    ],
    cons: [
      "Requires daily grooming",
      "Flat face can cause breathing issues",
      "Prone to tear staining",
      "Needs regular eye and face cleaning"
    ],
    healthAndCare: [
      { title: "Daily Grooming", description: "Brush daily to prevent mats in their long coat." },
      { title: "Face Cleaning", description: "Wipe eyes and facial folds daily." },
      { title: "Calm Environment", description: "They prefer peaceful homes without too much chaos." }
    ],
    funFact: "Himalayans are sometimes classified as a separate breed and sometimes as a color variety of Persian, depending on the cat association."
  },
  turkishangora: {
    breedName: "Turkish Angora",
    shortDescription: "Graceful, silky, and historically royal.",
    origin: "Turkey",
    lifespan: "12-18 Years",
    breedProfile: [
      "The Turkish Angora is an ancient, elegant breed with a fine, silky coat and a slender, athletic build. Often associated with Turkish royalty, they are one of the oldest naturally occurring long-haired breeds.",
      "Turkish Angoras are intelligent, active, and affectionate. They enjoy playing in water, climbing, and being involved in household activities. They form strong bonds with their families."
    ],
    topTraits: [
      { name: "Graceful", icon: "heart" },
      { name: "Intelligent", icon: "brain" },
      { name: "Playful", icon: "zap" }
    ],
    pros: [
      "Elegant, silky coat",
      "Active and engaging personality",
      "Forms strong family bonds",
      "Generally healthy and long-lived"
    ],
    cons: [
      "Can be demanding of attention",
      "Needs regular grooming",
      "May be selective about companions",
      "Active and needs play outlets"
    ],
    healthAndCare: [
      { title: "Coat Care", description: "Brush weekly to maintain their silky, single-layer coat." },
      { title: "Playtime", description: "Provide interactive toys and climbing opportunities." },
      { title: "Deafness Awareness", description: "White blue-eyed Angoras may be prone to deafness." }
    ],
    funFact: "Turkish Angoras are so treasured in their homeland that the Ankara Zoo maintains a dedicated breeding program to preserve the breed."
  },
  americanshorthair: {
    breedName: "American Shorthair",
    shortDescription: "Classic, sturdy, and all-American companion.",
    origin: "United States",
    lifespan: "15-20 Years",
    breedProfile: [
      "The American Shorthair is a versatile, medium-to-large breed with a muscular build and a classic tabby coat. Originally brought to America as working cats, they are now beloved family pets known for their longevity.",
      "American Shorthairs are easygoing, friendly, and low-maintenance. They are playful but not hyper, affectionate but not clingy, making them ideal companions for many households."
    ],
    topTraits: [
      { name: "Friendly", icon: "smile" },
      { name: "Low-Maintenance", icon: "heart" },
      { name: "Sturdy", icon: "zap" }
    ],
    pros: [
      "Easygoing and adaptable",
      "Good with kids and other pets",
      "Healthy and long-lived",
      "Low grooming needs"
    ],
    cons: [
      "Can be prone to obesity",
      "May be too independent for some",
      "Sheds seasonally",
      "Needs regular play to stay fit"
    ],
    healthAndCare: [
      { title: "Weight Management", description: "Control portions to prevent obesity." },
      { title: "Grooming", description: "Weekly brushing reduces shedding." },
      { title: "Play", description: "Encourage daily play to maintain muscle tone." }
    ],
    funFact: "The American Shorthair is one of the most popular cat breeds in the United States and is often mistaken for a domestic shorthair."
  },
  exoticshorthair: {
    breedName: "Exotic Shorthair",
    shortDescription: "A short-haired Persian with a playful streak.",
    origin: "United States",
    lifespan: "12-15 Years",
    breedProfile: [
      "The Exotic Shorthair was developed by crossing Persians with American Shorthairs, creating a cat with the Persian's sweet face and gentle temperament but a much easier-to-care-for short coat.",
      "Exotics are calm, affectionate, and slightly more playful than their Persian cousins. They love to cuddle and are content with a relaxed indoor lifestyle."
    ],
    topTraits: [
      { name: "Cuddly", icon: "heart" },
      { name: "Placid", icon: "smile" },
      { name: "Playful", icon: "zap" }
    ],
    pros: [
      "Sweet Persian-like temperament",
      "Short, easy-care coat",
      "Great lap cat",
      "Good with families"
    ],
    cons: [
      "Flat face can cause breathing issues",
      "Prone to tear staining",
      "Can gain weight easily",
      "Needs regular face cleaning"
    ],
    healthAndCare: [
      { title: "Face Care", description: "Clean facial folds and eyes regularly." },
      { title: "Weight Control", description: "Monitor food intake to prevent obesity." },
      { title: "Grooming", description: "Weekly brushing is usually sufficient." }
    ],
    funFact: "Exotic Shorthairs are sometimes nicknamed 'the lazy man's Persian' because they offer all the Persian charm with less grooming."
  },
  balinese: {
    breedName: "Balinese",
    shortDescription: "A long-haired Siamese with a melodic voice.",
    origin: "United States",
    lifespan: "12-20 Years",
    breedProfile: [
      "The Balinese is essentially a long-haired Siamese, sharing the same color-point pattern, sapphire-blue eyes, and vocal personality. Their silky coat is longer but surprisingly low-maintenance.",
      "Balinese cats are intelligent, social, and communicative. They form strong bonds with their people and will follow you around, offering commentary on your activities in their soft, melodic voice."
    ],
    topTraits: [
      { name: "Vocal", icon: "volume-2" },
      { name: "Loyal", icon: "heart" },
      { name: "Elegant", icon: "smile" }
    ],
    pros: [
      "Affectionate and people-oriented",
      "Intelligent and trainable",
      "Beautiful silky coat with minimal matting",
      "Often better tolerated by allergy sufferers"
    ],
    cons: [
      "Can be demanding of attention",
      "Doesn't like being left alone",
      "Vocal, which some may find excessive",
      "Needs mental stimulation"
    ],
    healthAndCare: [
      { title: "Coat Care", description: "Brush weekly to keep their silky coat beautiful." },
      { title: "Companionship", description: "Provide company or a pet friend to prevent loneliness." },
      { title: "Dental Care", description: "Regular dental cleanings support long-term health." }
    ],
    funFact: "Despite their name, Balinese cats were developed in the United States, not Bali — their graceful movements reminded breeders of Balinese dancers."
  },
  bombay: {
    breedName: "Bombay",
    shortDescription: "A mini black panther with a loving heart.",
    origin: "United States",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Bombay was bred to resemble a miniature black panther, with a sleek, jet-black coat, copper or gold eyes, and a compact, muscular body. They are the result of crossing Burmese with American Shorthairs.",
      "Bombays are affectionate, playful, and people-oriented. They love being the center of attention and are known for following their owners around and demanding cuddles."
    ],
    topTraits: [
      { name: "Affectionate", icon: "heart" },
      { name: "Sleek", icon: "smile" },
      { name: "Playful", icon: "zap" }
    ],
    pros: [
      "Stunning panther-like appearance",
      "Loving and devoted to family",
      "Good with children and pets",
      "Short, low-maintenance coat"
    ],
    cons: [
      "Can be prone to obesity",
      "Demands attention",
      "May develop sinus issues from flat face",
      "Doesn't like being left alone"
    ],
    healthAndCare: [
      { title: "Weight Control", description: "Monitor diet to prevent weight gain." },
      { title: "Grooming", description: "Weekly brushing keeps their black coat glossy." },
      { title: "Playtime", description: "Daily play keeps them physically and mentally fit." }
    ],
    funFact: "Bombays are sometimes called 'parlor panthers' because they were specifically bred to look like small, domesticated black leopards."
  },
  burmese: {
    breedName: "Burmese",
    shortDescription: "Velcro cats with big golden eyes and charm.",
    origin: "Myanmar (Burma)",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Burmese is a compact, muscular cat with a satin-like coat and large, expressive golden eyes. They are incredibly people-oriented and are often described as 'velcro cats' because they stick so close to their owners.",
      "Burmese cats are playful, affectionate, and retain a kitten-like energy into adulthood. They love interactive play and will often learn to fetch or perform tricks for attention."
    ],
    topTraits: [
      { name: "Affectionate", icon: "heart" },
      { name: "Playful", icon: "zap" },
      { name: "Charming", icon: "smile" }
    ],
    pros: [
      "Extremely loving and people-focused",
      "Playful and entertaining",
      "Good with families",
      "Short, easy-care coat"
    ],
    cons: [
      "Can be clingy and demanding",
      "Doesn't tolerate being alone well",
      "Prone to obesity",
      "Needs lots of attention"
    ],
    healthAndCare: [
      { title: "Weight Management", description: "Monitor food carefully; Burmese love to eat." },
      { title: "Playtime", description: "Daily interactive play prevents boredom and weight gain." },
      { title: "Companionship", description: "They do best in homes where they have company most of the day." }
    ],
    funFact: "Burmese cats are known for their dog-like devotion and often greet their owners at the door just like a canine companion."
  },
  chartreux: {
    breedName: "Chartreux",
    shortDescription: "Quiet, smiling, and blue-coated French cats.",
    origin: "France",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Chartreux is a sturdy, muscular breed with a distinctive blue-gray coat, copper or gold eyes, and a sweet, smiling expression. They are one of France's oldest and most cherished cat breeds.",
      "Chartreux cats are quiet, gentle, and intelligent. They are not overly vocal but communicate through soft chirps and expressive eyes. They form strong bonds with their families while maintaining an independent streak."
    ],
    topTraits: [
      { name: "Quiet", icon: "volume-2" },
      { name: "Gentle", icon: "heart" },
      { name: "Intelligent", icon: "brain" }
    ],
    pros: [
      "Calm and undemanding temperament",
      "Adaptable to various living situations",
      "Good with children and pets",
      "Low-maintenance water-resistant coat"
    ],
    cons: [
      "Can be reserved with strangers",
      "Not very vocal, so needs may be subtle",
      "Prone to obesity",
      "Rare and can be hard to find"
    ],
    healthAndCare: [
      { title: "Weight Control", description: "Watch portions carefully; Chartreux are prone to weight gain." },
      { title: "Grooming", description: "Weekly brushing is enough for their dense coat." },
      { title: "Dental Care", description: "Regular dental checkups support overall health." }
    ],
    funFact: "Chartreux cats were historically kept by French Carthusian monks, and their quiet nature made them perfect monastery companions."
  },
  egyptianmau: {
    breedName: "Egyptian Mau",
    shortDescription: "Spotted, speedy, and one of the oldest breeds.",
    origin: "Egypt",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Egyptian Mau is a naturally spotted breed with a sleek, athletic body and large, expressive gooseberry-green eyes. They are one of the few naturally occurring domestic spotted cat breeds and are considered living relics of ancient Egypt.",
      "Egyptian Maus are loyal, active, and sensitive. They bond deeply with their families and are known for their incredible speed — they can run up to 30 miles per hour!"
    ],
    topTraits: [
      { name: "Fast", icon: "zap" },
      { name: "Loyal", icon: "heart" },
      { name: "Spotted", icon: "smile" }
    ],
    pros: [
      "Beautiful natural spotted coat",
      "Extremely fast and athletic",
      "Loyal and devoted to family",
      "Intelligent and playful"
    ],
    cons: [
      "Sensitive to cold and stress",
      "Can be shy with strangers",
      "Needs lots of exercise",
      "Rare and can be expensive"
    ],
    healthAndCare: [
      { title: "Exercise", description: "Provide space for running, climbing, and chasing toys." },
      { title: "Warmth", description: "Keep them warm; their short coat offers little insulation." },
      { title: "Stress Management", description: "Provide a calm, stable environment." }
    ],
    funFact: "The Egyptian Mau is the fastest domestic cat breed and has a unique 'wiggle tail' when excited, similar to a cheetah."
  },
  japanesebobtail: {
    breedName: "Japanese Bobtail",
    shortDescription: "Lucky, lively, and born with a bunny tail.",
    origin: "Japan",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Japanese Bobtail is an ancient breed known for its distinctive short, pom-pom tail and friendly personality. In Japan, they are considered good luck, especially the calico 'Maneki-neko' coloring.",
      "Japanese Bobtails are active, social, and talkative. They have a soft, melodious voice and love to be involved in family activities. They are excellent jumpers and playful companions."
    ],
    topTraits: [
      { name: "Lively", icon: "zap" },
      { name: "Friendly", icon: "smile" },
      { name: "Lucky", icon: "heart" }
    ],
    pros: [
      "Outgoing and social personality",
      "Unique, charming tail",
      "Good with families and pets",
      "Active and entertaining"
    ],
    cons: [
      "Can be vocal",
      "Needs mental stimulation",
      "Active and may get into things",
      "Tail is a breed hallmark but varies in appearance"
    ],
    healthAndCare: [
      { title: "Playtime", description: "Provide plenty of toys and climbing opportunities." },
      { title: "Grooming", description: "Short or long coat needs regular brushing." },
      { title: "Social Interaction", description: "They thrive on family interaction and play." }
    ],
    funFact: "Japanese Bobtails are considered lucky charms in Japan, and the famous 'beckoning cat' figurine is modeled after this breed."
  },
  korat: {
    breedName: "Korat",
    shortDescription: "Silver-blue good-luck cats from Thailand.",
    origin: "Thailand",
    lifespan: "12-18 Years",
    breedProfile: [
      "The Korat is a small to medium-sized breed with a heart-shaped face, large green eyes, and a shimmering silver-blue coat. In Thailand, they are considered a symbol of good fortune and are often given as wedding gifts.",
      "Korats are sensitive, affectionate, and intelligent. They bond very closely with their families and can be shy or reserved around strangers. They prefer calm, predictable environments."
    ],
    topTraits: [
      { name: "Loyal", icon: "heart" },
      { name: "Sensitive", icon: "smile" },
      { name: "Beautiful", icon: "brain" }
    ],
    pros: [
      "Deeply loyal to family",
      "Stunning silver-blue coat",
      "Intelligent and playful",
      "Long-lived and generally healthy"
    ],
    cons: [
      "Can be shy with strangers",
      "Sensitive to loud noises",
      "Doesn't like being left alone",
      "Needs a calm environment"
    ],
    healthAndCare: [
      { title: "Stress Reduction", description: "Provide quiet spaces and minimize loud disruptions." },
      { title: "Grooming", description: "Weekly brushing keeps their coat shimmering." },
      { title: "Companionship", description: "They do best with consistent human companionship." }
    ],
    funFact: "Korats are one of the few breeds that are only accepted in one color: silver-blue — any other color is not considered a true Korat."
  },
  manx: {
    breedName: "Manx",
    shortDescription: "Tailless, sturdy, and loyal island cats.",
    origin: "Isle of Man",
    lifespan: "12-14 Years",
    breedProfile: [
      "The Manx is a tailless breed originating from the Isle of Man, known for its round body, thick coat, and strong hind legs. Their lack of tail is the result of a natural genetic mutation.",
      "Manx cats are loyal, playful, and excellent hunters. They often form strong bonds with their families and are known for their dog-like devotion, sometimes even learning to fetch."
    ],
    topTraits: [
      { name: "Loyal", icon: "heart" },
      { name: "Playful", icon: "zap" },
      { name: "Sturdy", icon: "smile" }
    ],
    pros: [
      "Devoted and dog-like companions",
      "Excellent hunters and playful",
      "Adaptable to various homes",
      "Come in both long and short coats"
    ],
    cons: [
      "Tail gene can cause spinal issues",
      "Requires careful breeding practices",
      "Can be prone to arthritis",
      "Needs regular grooming for long-haired variety"
    ],
    healthAndCare: [
      { title: "Spinal Health", description: "Choose responsibly bred Manx to avoid spinal problems." },
      { title: "Weight Control", description: "Monitor weight to reduce stress on their body." },
      { title: "Grooming", description: "Brush regularly, especially for long-haired Manx." }
    ],
    funFact: "Manx cats are sometimes called 'rabbit cats' because of their round rump and powerful hind legs, which give them a distinctive hopping gait."
  },
  ocicat: {
    breedName: "Ocicat",
    shortDescription: "Wild-looking spots with a domestic personality.",
    origin: "United States",
    lifespan: "12-18 Years",
    breedProfile: [
      "The Ocicat has a striking spotted coat that gives it a wild, exotic appearance, but it is entirely domestic. Originally created by crossing Siamese, Abyssinian, and American Shorthair cats, Ocicats are friendly and outgoing.",
      "Ocicats are social, playful, and intelligent. They love being around people and other pets and are known for their confident, dog-like personality."
    ],
    topTraits: [
      { name: "Social", icon: "smile" },
      { name: "Spotted", icon: "heart" },
      { name: "Playful", icon: "zap" }
    ],
    pros: [
      "Exotic wild appearance",
      "Friendly and outgoing",
      "Intelligent and trainable",
      "Good with families and other pets"
    ],
    cons: [
      "Needs lots of attention",
      "Can be demanding",
      "Requires mental stimulation",
      "Active and needs play outlets"
    ],
    healthAndCare: [
      { title: "Exercise", description: "Provide climbing, chasing, and interactive play daily." },
      { title: "Social Time", description: "They thrive with company and attention." },
      { title: "Dental Care", description: "Regular dental care supports long-term health." }
    ],
    funFact: "Despite their wild looks, Ocicats have no wild cat DNA — their spotted coat is the result of careful domestic breeding."
  },
  somali: {
    breedName: "Somali",
    shortDescription: "A fox-like, long-haired Abyssinian explorer.",
    origin: "Somalia / United States",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Somali is the long-haired version of the Abyssinian, with a beautiful ticked coat, large ears, and a bushy tail that gives them a fox-like appearance. They are active, curious, and highly intelligent.",
      "Somalis are playful, affectionate, and always on the move. They love to explore, climb, and play with puzzle toys. Their kitten-like energy lasts well into adulthood."
    ],
    topTraits: [
      { name: "Fox-Like", icon: "heart" },
      { name: "Active", icon: "zap" },
      { name: "Curious", icon: "brain" }
    ],
    pros: [
      "Beautiful, unique ticked coat",
      "Playful and entertaining",
      "Intelligent and trainable",
      "Affectionate with family"
    ],
    cons: [
      "Needs lots of activity",
      "Can be mischievous",
      "Coat requires regular brushing",
      "Doesn't like being bored"
    ],
    healthAndCare: [
      { title: "Grooming", description: "Brush twice weekly to maintain their luxuriant coat." },
      { title: "Enrichment", description: "Rotate toys and provide climbing opportunities." },
      { title: "Dental Health", description: "Regular dental care prevents common issues." }
    ],
    funFact: "Somalis are sometimes called 'fox cats' because of their bushy tails, large ears, and warm ticked coloring."
  },
  tonkinese: {
    breedName: "Tonkinese",
    shortDescription: "A playful blend of Siamese and Burmese charm.",
    origin: "Canada / United States",
    lifespan: "12-16 Years",
    breedProfile: [
      "The Tonkinese is a cross between the Siamese and Burmese, combining the best traits of both breeds. They have a moderate build, striking aqua-colored eyes, and a soft, short coat.",
      "Tonkinese cats are playful, affectionate, and social. They love interactive play, conversation, and being part of the family. They are less vocal than Siamese but just as engaging."
    ],
    topTraits: [
      { name: "Playful", icon: "zap" },
      { name: "Social", icon: "smile" },
      { name: "Affectionate", icon: "heart" }
    ],
    pros: [
      "Friendly and outgoing",
      "Intelligent and trainable",
      "Good with families and pets",
      "Moderate vocalization"
    ],
    cons: [
      "Needs attention and companionship",
      "Can be mischievous when bored",
      "Prone to dental issues",
      "Doesn't tolerate loneliness well"
    ],
    healthAndCare: [
      { title: "Dental Care", description: "Regular dental cleanings help prevent gum disease." },
      { title: "Playtime", description: "Daily play sessions keep them happy and fit." },
      { title: "Companionship", description: "They thrive with people or other pets around." }
    ],
    funFact: "Tonkinese kittens are born with blue eyes that gradually change to their signature aqua hue as they mature."
  },
  turkishvan: {
    breedName: "Turkish Van",
    shortDescription: "A strong, semi-long-haired cat that loves water.",
    origin: "Turkey",
    lifespan: "12-17 Years",
    breedProfile: [
      "The Turkish Van is a large, powerful breed with a chalk-white body and colored markings on the head and tail. They are famous for their unusual love of water, earning them the nickname 'swimming cat.'",
      "Turkish Vans are independent, intelligent, and active. They are not typical lap cats but form strong bonds with their families and enjoy interactive play and exploring their environment."
    ],
    topTraits: [
      { name: "Swimmer", icon: "droplet" },
      { name: "Strong", icon: "zap" },
      { name: "Independent", icon: "brain" }
    ],
    pros: [
      "Unique color pattern",
      "Loves water and swimming",
      "Active and playful",
      "Generally healthy and robust"
    ],
    cons: [
      "Can be independent and aloof",
      "Needs space to roam and play",
      "Seasonal shedding is heavy",
      "Not a cuddly lap cat for everyone"
    ],
    healthAndCare: [
      { title: "Coat Care", description: "Brush regularly, especially during seasonal shedding." },
      { title: "Water Play", description: "Supervise water play and provide safe access to water." },
      { title: "Exercise", description: "Provide climbing structures and active play sessions." }
    ],
    funFact: "Turkish Vans have a unique cashmere-like coat that is water-resistant, making them natural swimmers compared to most cats."
  }
};
