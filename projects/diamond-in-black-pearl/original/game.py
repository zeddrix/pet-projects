def start():
    print("\n")
    print("""You are in an uncharted jungle looking for the Pink Panther.

* On your RIGHT is a dry road.
* On your LEFT is a lake. A boat is near it.

Which one will you take?
""")

    road = input(">>> ")

    if "right" in road or "RIGHT" in road:
        scorpion()

    elif "left" in road or "LEFT" in road:
        crocodile()

    elif "BLACK PEARL" in road:
        the_pirate()

    else:
        no_idea()
        start()

# --------------------------------------------------------------------------------------------------------------------------------


def crocodile():
    print("\n")
    print("""There are BIG and DEADLY crocodiles.
WHAT DO YOU DO?

* Go BACK.
* Let them EAT your head.""")

    crocodiles = input(">>> ")

    if "back" in crocodiles or "BACK" in crocodiles:
        print("------------------------------------------------------------------------")
        print("Welcome back!")
        print("------------------------------------------------------------------------")

        start()

    elif "EAT" in crocodiles or "eat" in crocodiles:
        restarter()
    else:
        no_idea()
        crocodile()

# --------------------------------------------------------------------------------------------------------------------------------


def scorpion():
    print("\n \n")
    print("""You see SCORPIONS coming out all over the dry road!
WHAT DO YOU DO?

* WALK on them.
* RUN from them.
* Use the BOAT.""")

    scorpions = input(">>> ")

    if "walk" in scorpions or "WALK" in scorpions:
        print("------------------------------------------------------------------------")
        print("Wow! You're quite brave! But the scorpions stung you and you fell unconscious and laid eggs in your brain.")
        restarter()

    elif "run" in scorpions or "RUN" in scorpions:
        print("------------------------------------------------------")
        print("""Wow! You're quite brave! Your energy drained and these scorpions were all over this road. 
        The scorpions stung you and you fell unconscious and laid eggs in your brain!""")
        restarter()

    elif "BOAT" in scorpions or "boat" in scorpions:
        where_boat()
    else:
        no_idea()
        scorpion()

# --------------------------------------------------------------------------------------------------------------------------------


def where_boat():
    print("\n \n")
    print("""Boat? What boat? Where was that boat located?""")

    where = input(">>> ")

    if "lake" in where or "LAKE" in where or "left" in where or "LEFT" in where:
        print("------------------")
        print("GOOD MEMORY!")
        print("------------------")
        the_boat()

    else:
        print("------------------------------------------------------")
        print("WHERE?")
        print("------------------------------------------------------")
        where_boat()
# --------------------------------------------------------------------------------------------------------------------------------


def the_boat():
    print("\n \n")
    print("""WHAT WOULD YOU DO WITH THAT BOAT?

* Use it as BOOTS.
* PUSH it onto the sloaping road. Get ON it and then SLIDE.
* Chop it and take a piece as a TORCH to shoosh the scorpions away.
* Chop it, make a BONFIRE, and wait for help.""")

    boat = input(">>> ")

    if "boots" in boat or "BOOTS" in boat:
        print("------------------------------------------------------")
        print("Are you CRAZY? AGAIN!")
        print("------------------------------------------------------")

        the_boat()

    elif "torch" in boat or "TORCH" in boat:
        print("------------------------------------------------------")
        print("""They avoided you at first but eventually, you RAN OUT of wood. 
            the scorpions stung you, you fell unconscious, then they came inside your nose and ears 
            and laid eggs on your brain.""")
        print("------------------------------------------------------")
        restarter()

    elif "BONFIRE" in boat or "bonfire" in boat:
        print("------------------------------------------------------")
        print("Sure! The scorpions will HELP you with ending your life quicker. Tsk tsk.. AGAIN!")
        print("------------------------------------------------------")
        the_boat()

    elif "PUSH" in boat or "push" in boat:
        print("------------------------------------------------------")
        print("Good job!")
        print("------------------------------------------------------")
        the_bear()
    else:
        no_idea()
        the_boat()

# --------------------------------------------------------------------------------------------------------------------------------


def the_bear():
    print("\n \n")
    print("When you reached the end of the road, there is a grizzly bear.")
    print("""What do you do?

* BEFRIEND the bear.
* PUNCH him in the face.
* Play DEAD.
* Make him EAT your boat.""")

    bear = input(">>> ")

    if "dead" in bear or "DEAD" in bear:
        print("------------------------------------------------------")
        print("The BEAR walked away. Woah! How did you know that?")
        print("------------------------------------------------------")
        the_basket()

    elif "befriend" in bear or "BEFRIEND" in bear:
        print("------------------------------------------------------")
        print("WELCOME TO THE CLUB OF BEARS!")
        print("idiot...")
        print("------------------------------------------------------")
        restarter()

    elif "punch" in bear or "PUNCH" in bear:
        print("------------------------------------------------------")
        print("ARE YOU CRAZY?")
        print("------------------------------------------------------")
        restarter()

    elif "eat" in bear or "EAT" in bear:

        print("------------------------------------------------------")
        print("AND YOU THINK THEY'LL EAT THE BOAT AND NOT YOU IF YOU DO THAT???")
        print("------------------------------------------------------")
        restarter()

    else:
        no_idea()

        the_bear()

# --------------------------------------------------------------------------------------------------------------------------------


def the_basket():
    print("\n \n")
    print("""You saw a wooden BASKET.
WHAT DO YOU DO?

* KICK it away.
* OPEN it.
* CARRY it.""")

    basket = input(">>> ")

    if "open" in basket or "OPEN" in basket:
        the_map()
    elif "kick" in basket or "KICK" in basket or "carry" in basket or "CARRY" in basket:
        print("------------------------------------------------------")
        print("ARE YOU CRAZY? Why would you do that?")
        print("------------------------------------------------------")

        the_basket()
    else:
        no_idea()
        the_basket()

# --------------------------------------------------------------------------------------------------------------------------------


def the_map():
    print("\n \n")
    print("""You found a TREASURE MAP! After UNROLLING it, you saw the words: \'TREASURE HERE\' written on a SKULL FACE.
WOULD YOU:

* FOLLOW the map?
* CHASE the bear to ask some directions?""")

    dmap = input(">>> ")

    if "chase" in dmap or "CHASE" in dmap or "ASK" in dmap or "ask" in dmap:
        print("------------------------------------------------------")
        print("GREAT JOB! You are now one of the BEAR GANG!")
        print("idiot...")
        print("------------------------------------------------------")
        restarter()

    elif "follow" in dmap or "FOLLOW" in dmap:
        the_pirate()

    else:
        no_idea()
        the_map()

# --------------------------------------------------------------------------------------------------------------------------------


def the_pirate():
    print("------------------------------------------------------")
    print(">>> CHECKPOINT <<<")
    print("------------------------------------------------------")
    print("""You found a pirates's ship, anchored by the shore, with the name: \'BLACK PEARL.\' 
\"Great! Now do we get to meet the great Captain Jack Sparrow?\"

Anyhow, you've got no other choice to get inside it but through the holes of the ship designated for the ship's canons.

You got inside.
HOW WOULD YOU LOOK FOR THE PINK PANTHER?

* ASK a pirate where the treasure is HIDDEN.
* LOOK for a pirate's DRESS to wear first.""")

    pirate = input(">>> ")

    if "ask" in pirate or "ASK" in pirate:
        print("------------------------------------------------------")
        print("He told you to go to the CAPTAIN of the ship and ask where the PINK PANTHER is.")

        ask_captain()

    elif "LOOK" in pirate or "look" in pirate:
        tall_pirate()

    else:
        no_idea()
        the_pirate()

# --------------------------------------------------------------------------------------------------------------------------------


def ask_captain():
    print("WOULD YOU REALLY DO WHAT HE SAID TO YOU?")

    ask = input(">>> ")

    if "YES" in ask or "yes" in ask:
        print("------------------------------------------------------")
        print("""Very well.
You went to the CAPTAIN and did what the pirate TOLD you to ask. The Captain LAUGHED OUT LOUD and CHOPPED your head off.
idiot...""")
        check_point()

    elif "no" in ask or "NO" in ask:
        print("\n\n------------------------------------------------------")
        print("Alright. You've returned to the . . .")
        the_pirate()

    else:
        no_idea()
        ask_captain()
# --------------------------------------------------------------------------------------------------------------------------------


def tall_pirate():
    print("\n \n")
    print("""You now found a pirates's dress and dressed.
You were surprised when you saw a TALL, WELL-BUILT pirate carrying a PINK PANTHER going BELOW DECK.
You wanted to hide but it was too late. He saw you and asked you \'WHO ARE YOU?\'

WHAT DO YOU DO NOW?

* Show him those 6-pack abs and then PUNCH him in the face.
* Say 'hi' and tell him your NAME.
* RUN for your life!!!""")

    PIRATE = input(">>> ")

    if "punch" in PIRATE or "PUNCH" in PIRATE:
        print("------------------------------------------------------------------------")
        print("""He has a WELL-BUILT Body.
He knocked you out and brought you to the CAPTAIN.
Where's your SIX-PACKS now?""")
        print("------------------------------------------------------------------------")

        check_point()

    elif "RUN" in PIRATE or "run" in PIRATE:
        print("------------------------------------------------------------------------")
        print("""You can outrun him because you are smaller than him.
But of course that would make a noise. The crew heard you and brought you to the captain.""")
        check_point()

    elif "name" in PIRATE or "NAME" in PIRATE:
        the_treasure()
    else:
        no_idea()
        tall_pirate()

# --------------------------------------------------------------------------------------------------------------------------------


def the_treasure():
    print("\n \n")
    print("""You found out that he was just NEW to the crew.
His name is BEN. He put the DIAMOND in the treasure chest and went ABOVE DECK. You've got the TREASURE chest.
But how are you gonna get OUT?

* Ask the CAPTAIN.
* Ask YOURSELF \'How did I get in anyway?\'""")

    treasure = input(">>> ")

    if "captain" in treasure or "CAPTAIN" in treasure:
        print("------------------------------------------------------------------------")
        print("""You just STOLE from a man and asked HIM how to get HIS property out of HIS house?!
What do you think he'll do to ye? Make you walk the plank? Abandon you on a deserted island?
Or perhaps bury you in that island alive? Well me, I dunno. . .""")
        check_point()

    elif "yourself" in treasure or "YOURSELF" in treasure:
        way_out()

    else:
        no_idea()
        the_treasure()
# --------------------------------------------------------------------------------------------------------------------------------


def way_out():
    print("\n \n")
    print("""NOW HOW DID YOU GET IN THE PIRATE SHIP? Do you remember where you went through? Use your memory again.""")

    canon = input(">>> ")

    if "canon" in canon or "CANON" in canon:
        print("------------------------------------------------------")
        print("GOOD MEMORY!")
        print("------------------------------------------------------")

        go_paddle()
    else:
        no_idea()
        way_out()

# --------------------------------------------------------------------------------------------------------------------------------


def go_paddle():
    print("\n \n")
    print("""GOOD FOR YOU! Surprisingly, YOU GOT THE TREASURE!!! and you're now in a canoe.
          You can finally make for your escape!!!
But don't celebrate just yet mate! The pirates saw you and started FIRING canons on you.
WHAT DO YOU NOW?

* DIVE into the water.
* FIRE back!
* PADDLE as fast as you can! As if your life depends on it, because it really does.""")

    paddle = input(">>> ")

    if "dive" in paddle or "DIVE" in paddle:
        print("------------------------------------------------------------------------")
        print("""You got AWAY! GREAT JOB! But you left the TREASURE on the canoe. 
You came back and was hit by the pirates.""")
        print("------------------------------------------------------------------------")
        check_point()

    elif "fire" in paddle or "FIRE" in paddle:
        print("------------------------------------------------------------------------")
        print(
            """ARE YOU CRAZY? You're in a canoe! What will you fire back? Your paddles?""")
        print("------------------------------------------------------------------------")
        go_paddle()

    elif "paddle" in paddle or "PADDLE" in paddle:
        print("Great paddling!")
        treasure_chest()

    else:
        no_idea()
        go_paddle()
# --------------------------------------------------------------------------------------------------------------------------------


def treasure_chest():
    print("\n \n")
    print("""You outrun them and got on dry land. You realized that the chest's key was left back on the BLACK PEARL!

    WHAT DO YOU DO? This will be your last question to acquire the pink panther! So choose your words wisely.""")

    key = input(">>> ")

    if "smash" in key or "SMASH" in key:
        print("\n \n")

        print("Great thinking! YOU GOT THE PINK PANTHER!")
        print(" ")
        print("********************************************************************************************")
        print("********************************************************************************************")
        print("********************************************************************************************")
        print("****************************************GAME OVER*******************************************")
        print("********************************************************************************************")
        print("********************************************************************************************")
        print("********************************************************************************************")
        print(" ")
        print("\n But how are gonna get back home?")
        print("\n PART II COMING SOON..")

    elif "open" in key or "OPEN" in key:
        print("------------------------------------------------------")
        print("You don't have a key.")
        print("------------------------------------------------------")
        treasure_chest()
    elif "destroy" in key or "DESTROY" in key:
        print("------------------------------------------------------")
        print("With what?? TRY AGAIN!")
        print("------------------------------------------------------")
        treasure_chest()

    elif "wreck" in key or "WRECK" in key:
        print("------------------------------------------------------")
        print("With your hands wreck-it-ralph? TRY AGAIN!")
        print("------------------------------------------------------")
        treasure_chest()

    elif "throw" in key or "THROW" in key:
        print("------------------------------------------------------")
        print("You just got the chest and now you wanna get rid of it? TRY AGAIN!")
        print("------------------------------------------------------")
        treasure_chest()

    elif "back" in key or "BACK" in key:
        back()

    else:
        no_idea()
        treasure_chest()


def back():
    print("------------------------------------------------------")
    print("Are you sure? You wanna go back?")
    print("------------------------------------------------------")

    go_back = input(">>> ")

    if "yes" in go_back or "YES" in go_back:
        print("\n ------------------------------------------------------")
        print("\n They caught you and killed ya.")
        print("------------------------------------------------------ \n")
        check_point()

    elif "no" in go_back or "NO" in go_back:
        print("\n------------------------------------------------------")
        print("\n GOOD! Think again.")
        print("------------------------------------------------------")
        treasure_chest()

    else:
        no_idea()
        treasure_chest()


# --------------------------------------------------------------------------------------------------------------------------------
def no_idea():
    print("\n")
    print("\t\t\t>>>SORRY. I HAVE NO IDEA WHAT YOU'RE SAYING. PLEASE TRY AGAIN.<<<")

# --------------------------------------------------------------------------------------------------------------------------------


def restarter():
    print("------------------------------------------------------------------------")
    print("YOU JUST DIED...")
    print("------------------------------------------------------------------------")
    print("""Will you start the game again?
YES or NO""")
    restart = input(">>> ")

    if "yes" in restart or "YES" in restart:
        print("------------------------------------------------------------------------")
        print("\nWELCOME BACK!")
        name()

    if "no" in restart or "NO" in restart:
        print("------------------------------------------------------------------------")
        print("BYE!")


def name():
    print("Before we start, kindly FULL SCREEN your terminal.")
    print("After you do, tell us your name, player!")

    player = input("Name: ")
    print(" ")
    print("********************************************************************************************")
    print("********************************************************************************************")
    print("********************************************************************************************")
    print("***********************************DIAMOND IN BLACK PEARL***********************************")
    print("********************************************************************************************")
    print("********************************************************************************************")
    print("********************************************************************************************")
    print(" ")
    print(f"Welcome to the the game {player}!")
    print("Here are some rules to this game:")
    print("1. Read everything carefully!")
    print("2. TYPE IN THE CAPS LOCKED KEYWORDS for all of your answers!")
    print("3. Use your imagination and common sense :))")
    print("4. Enjoy!! ;)")
    print("--------------------------------")
    start()


def check_point():
    print("------------------------------------------------------------------------")
    print("YOU JUST DIED...")
    print("------------------------------------------------------------------------")
    print("""Will you start on the CHECKPOINT again?
YES or NO""")
    restart = input(">>> ")

    if "yes" in restart or "YES" in restart:
        print("------------------------------------------------------------------------")
        print("\nWELCOME BACK!")
        print("------------------------------------------------------------------------")
        the_pirate()

    if "no" in restart or "NO" in restart:
        print("------------------------------------------------------------------------")
        print("BYE!")


name()
