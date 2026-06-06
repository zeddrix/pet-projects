"""Browser game engine derived from original/game.py — do not edit original/."""

from typing import Protocol


class GameIO(Protocol):
    def write(self, text: str) -> None: ...
    def read(self, prompt: str = ">>> ") -> str: ...
    def on_scene(self, scene_id: str) -> None: ...


_io: GameIO | None = None


def _scene(scene_id: str) -> None:
    if _io is not None:
        _io.on_scene(scene_id)


def _write(text: str = "") -> None:
    assert _io is not None
    _io.write(text if text.endswith("\n") else text + "\n")


def _read(prompt: str = ">>> ") -> str:
    assert _io is not None
    return _io.read(prompt)


def _matches(text: str, *tokens: str) -> bool:
    normalized = text.upper()
    return any(token.upper() in normalized for token in tokens)


def run_game(io: GameIO) -> None:
    global _io
    _io = io
    name()


def start():
    _scene("jungle_fork")
    _write("\n")
    _write("""You are in an uncharted jungle looking for the Pink Panther.

* On your RIGHT is a dry road.
* On your LEFT is a lake. A boat is near it.

Which one will you take?
""")

    road = _read(">>> ")

    if _matches(road, "right"):
        scorpion()

    elif _matches(road, "left"):
        crocodile()

    elif _matches(road, "BLACK PEARL"):
        the_pirate()

    else:
        no_idea()
        start()

# --------------------------------------------------------------------------------------------------------------------------------


def crocodile():
    _scene("crocodile_lake")
    _write("\n")
    _write("""There are BIG and DEADLY crocodiles.
WHAT DO YOU DO?

* Go BACK.
* Let them EAT your head.""")

    crocodiles = _read(">>> ")

    if _matches(crocodiles, "back"):
        _write("------------------------------------------------------------------------")
        _write("Welcome back!")
        _write("------------------------------------------------------------------------")

        start()

    elif _matches(crocodiles, "EAT"):
        restarter()
    else:
        no_idea()
        crocodile()

# --------------------------------------------------------------------------------------------------------------------------------


def scorpion():
    _scene("scorpion_road")
    _write("\n \n")
    _write("""You see SCORPIONS coming out all over the dry road!
WHAT DO YOU DO?

* WALK on them.
* RUN from them.
* Use the BOAT.""")

    scorpions = _read(">>> ")

    if _matches(scorpions, "walk"):
        _write("------------------------------------------------------------------------")
        _write("Wow! You're quite brave! But the scorpions stung you and you fell unconscious and laid eggs in your brain.")
        restarter()

    elif _matches(scorpions, "run"):
        _write("------------------------------------------------------")
        _write("""Wow! You're quite brave! Your energy drained and these scorpions were all over this road. 
        The scorpions stung you and you fell unconscious and laid eggs in your brain!""")
        restarter()

    elif _matches(scorpions, "BOAT"):
        where_boat()
    else:
        no_idea()
        scorpion()

# --------------------------------------------------------------------------------------------------------------------------------


def where_boat():
    _scene("boat_memory")
    _write("\n \n")
    _write("""Boat? What boat? Where was that boat located?""")

    where = _read(">>> ")

    if _matches(where, "lake", "left"):
        _write("------------------")
        _write("GOOD MEMORY!")
        _write("------------------")
        the_boat()

    else:
        _write("------------------------------------------------------")
        _write("WHERE?")
        _write("------------------------------------------------------")
        where_boat()
# --------------------------------------------------------------------------------------------------------------------------------


def the_boat():
    _scene("boat_choice")
    _write("\n \n")
    _write("""WHAT WOULD YOU DO WITH THAT BOAT?

* Use it as BOOTS.
* PUSH it onto the sloaping road. Get ON it and then SLIDE.
* Chop it and take a piece as a TORCH to shoosh the scorpions away.
* Chop it, make a BONFIRE, and wait for help.""")

    boat = _read(">>> ")

    if _matches(boat, "boots"):
        _write("------------------------------------------------------")
        _write("Are you CRAZY? AGAIN!")
        _write("------------------------------------------------------")

        the_boat()

    elif _matches(boat, "torch"):
        _write("------------------------------------------------------")
        _write("""They avoided you at first but eventually, you RAN OUT of wood. 
            the scorpions stung you, you fell unconscious, then they came inside your nose and ears 
            and laid eggs on your brain.""")
        _write("------------------------------------------------------")
        restarter()

    elif _matches(boat, "BONFIRE"):
        _write("------------------------------------------------------")
        _write("Sure! The scorpions will HELP you with ending your life quicker. Tsk tsk.. AGAIN!")
        _write("------------------------------------------------------")
        the_boat()

    elif _matches(boat, "PUSH"):
        _write("------------------------------------------------------")
        _write("Good job!")
        _write("------------------------------------------------------")
        the_bear()
    else:
        no_idea()
        the_boat()

# --------------------------------------------------------------------------------------------------------------------------------


def the_bear():
    _scene("bear_encounter")
    _write("\n \n")
    _write("When you reached the end of the road, there is a grizzly bear.")
    _write("""What do you do?

* BEFRIEND the bear.
* PUNCH him in the face.
* Play DEAD.
* Make him EAT your boat.""")

    bear = _read(">>> ")

    if _matches(bear, "dead"):
        _write("------------------------------------------------------")
        _write("The BEAR walked away. Woah! How did you know that?")
        _write("------------------------------------------------------")
        the_basket()

    elif _matches(bear, "befriend"):
        _write("------------------------------------------------------")
        _write("WELCOME TO THE CLUB OF BEARS!")
        _write("idiot...")
        _write("------------------------------------------------------")
        restarter()

    elif _matches(bear, "punch"):
        _write("------------------------------------------------------")
        _write("ARE YOU CRAZY?")
        _write("------------------------------------------------------")
        restarter()

    elif _matches(bear, "eat"):

        _write("------------------------------------------------------")
        _write("AND YOU THINK THEY'LL EAT THE BOAT AND NOT YOU IF YOU DO THAT???")
        _write("------------------------------------------------------")
        restarter()

    else:
        no_idea()

        the_bear()

# --------------------------------------------------------------------------------------------------------------------------------


def the_basket():
    _scene("basket")
    _write("\n \n")
    _write("""You saw a wooden BASKET.
WHAT DO YOU DO?

* KICK it away.
* OPEN it.
* CARRY it.""")

    basket = _read(">>> ")

    if _matches(basket, "open"):
        the_map()
    elif _matches(basket, "kick", "carry"):
        _write("------------------------------------------------------")
        _write("ARE YOU CRAZY? Why would you do that?")
        _write("------------------------------------------------------")

        the_basket()
    else:
        no_idea()
        the_basket()

# --------------------------------------------------------------------------------------------------------------------------------


def the_map():
    _scene("treasure_map")
    _write("\n \n")
    _write("""You found a TREASURE MAP! After UNROLLING it, you saw the words: \'TREASURE HERE\' written on a SKULL FACE.
WOULD YOU:

* FOLLOW the map?
* CHASE the bear to ask some directions?""")

    dmap = _read(">>> ")

    if _matches(dmap, "chase", "ASK"):
        _write("------------------------------------------------------")
        _write("GREAT JOB! You are now one of the BEAR GANG!")
        _write("idiot...")
        _write("------------------------------------------------------")
        restarter()

    elif _matches(dmap, "follow"):
        the_pirate()

    else:
        no_idea()
        the_map()

# --------------------------------------------------------------------------------------------------------------------------------


def the_pirate():
    _scene("black_pearl_checkpoint")
    _write("------------------------------------------------------")
    _write(">>> CHECKPOINT <<<")
    _write("------------------------------------------------------")
    _write("""You found a pirates's ship, anchored by the shore, with the name: \'BLACK PEARL.\' 
\"Great! Now do we get to meet the great Captain Jack Sparrow?\"

Anyhow, you've got no other choice to get inside it but through the holes of the ship designated for the ship's canons.

You got inside.
HOW WOULD YOU LOOK FOR THE PINK PANTHER?

* ASK a pirate where the treasure is HIDDEN.
* LOOK for a pirate's DRESS to wear first.""")

    pirate = _read(">>> ")

    if _matches(pirate, "ask"):
        _write("------------------------------------------------------")
        _write("He told you to go to the CAPTAIN of the ship and ask where the PINK PANTHER is.")

        ask_captain()

    elif _matches(pirate, "LOOK"):
        tall_pirate()

    else:
        no_idea()
        the_pirate()

# --------------------------------------------------------------------------------------------------------------------------------


def ask_captain():
    _scene("ask_captain")
    _write("WOULD YOU REALLY DO WHAT HE SAID TO YOU?")

    ask = _read(">>> ")

    if _matches(ask, "YES"):
        _write("------------------------------------------------------")
        _write("""Very well.
You went to the CAPTAIN and did what the pirate TOLD you to ask. The Captain LAUGHED OUT LOUD and CHOPPED your head off.
idiot...""")
        check_point()

    elif _matches(ask, "no"):
        _write("\n\n------------------------------------------------------")
        _write("Alright. You've returned to the . . .")
        the_pirate()

    else:
        no_idea()
        ask_captain()
# --------------------------------------------------------------------------------------------------------------------------------


def tall_pirate():
    _scene("tall_pirate")
    _write("\n \n")
    _write("""You now found a pirates's dress and dressed.
You were surprised when you saw a TALL, WELL-BUILT pirate carrying a PINK PANTHER going BELOW DECK.
You wanted to hide but it was too late. He saw you and asked you \'WHO ARE YOU?\'

WHAT DO YOU DO NOW?

* Show him those 6-pack abs and then PUNCH him in the face.
* Say 'hi' and tell him your NAME.
* RUN for your life!!!""")

    PIRATE = _read(">>> ")

    if _matches(PIRATE, "punch"):
        _write("------------------------------------------------------------------------")
        _write("""He has a WELL-BUILT Body.
He knocked you out and brought you to the CAPTAIN.
Where's your SIX-PACKS now?""")
        _write("------------------------------------------------------------------------")

        check_point()

    elif _matches(PIRATE, "RUN"):
        _write("------------------------------------------------------------------------")
        _write("""You can outrun him because you are smaller than him.
But of course that would make a noise. The crew heard you and brought you to the captain.""")
        check_point()

    elif _matches(PIRATE, "name"):
        the_treasure()
    else:
        no_idea()
        tall_pirate()

# --------------------------------------------------------------------------------------------------------------------------------


def the_treasure():
    _scene("treasure_escape")
    _write("\n \n")
    _write("""You found out that he was just NEW to the crew.
His name is BEN. He put the DIAMOND in the treasure chest and went ABOVE DECK. You've got the TREASURE chest.
But how are you gonna get OUT?

* Ask the CAPTAIN.
* Ask YOURSELF \'How did I get in anyway?\'""")

    treasure = _read(">>> ")

    if _matches(treasure, "captain"):
        _write("------------------------------------------------------------------------")
        _write("""You just STOLE from a man and asked HIM how to get HIS property out of HIS house?!
What do you think he'll do to ye? Make you walk the plank? Abandon you on a deserted island?
Or perhaps bury you in that island alive? Well me, I dunno. . .""")
        check_point()

    elif _matches(treasure, "yourself"):
        way_out()

    else:
        no_idea()
        the_treasure()
# --------------------------------------------------------------------------------------------------------------------------------


def way_out():
    _scene("canon_memory")
    _write("\n \n")
    _write("""NOW HOW DID YOU GET IN THE PIRATE SHIP? Do you remember where you went through? Use your memory again.""")

    canon = _read(">>> ")

    if _matches(canon, "canon"):
        _write("------------------------------------------------------")
        _write("GOOD MEMORY!")
        _write("------------------------------------------------------")

        go_paddle()
    else:
        no_idea()
        way_out()

# --------------------------------------------------------------------------------------------------------------------------------


def go_paddle():
    _scene("canoe_chase")
    _write("\n \n")
    _write("""GOOD FOR YOU! Surprisingly, YOU GOT THE TREASURE!!! and you're now in a canoe.
          You can finally make for your escape!!!
But don't celebrate just yet mate! The pirates saw you and started FIRING canons on you.
WHAT DO YOU NOW?

* DIVE into the water.
* FIRE back!
* PADDLE as fast as you can! As if your life depends on it, because it really does.""")

    paddle = _read(">>> ")

    if _matches(paddle, "dive"):
        _write("------------------------------------------------------------------------")
        _write("""You got AWAY! GREAT JOB! But you left the TREASURE on the canoe. 
You came back and was hit by the pirates.""")
        _write("------------------------------------------------------------------------")
        check_point()

    elif _matches(paddle, "fire"):
        _write("------------------------------------------------------------------------")
        _write(
            """ARE YOU CRAZY? You're in a canoe! What will you fire back? Your paddles?""")
        _write("------------------------------------------------------------------------")
        go_paddle()

    elif _matches(paddle, "paddle"):
        _write("Great paddling!")
        treasure_chest()

    else:
        no_idea()
        go_paddle()
# --------------------------------------------------------------------------------------------------------------------------------


def treasure_chest():
    _scene("chest_finale")
    _write("\n \n")
    _write("""You outrun them and got on dry land. You realized that the chest's key was left back on the BLACK PEARL!

    WHAT DO YOU DO? This will be your last question to acquire the pink panther! So choose your words wisely.""")

    key = _read(">>> ")

    if _matches(key, "smash"):
        _write("\n \n")

        _scene("victory")
        _write("Great thinking! YOU GOT THE PINK PANTHER!")
        _write(" ")
        _write("********************************************************************************************")
        _write("********************************************************************************************")
        _write("********************************************************************************************")
        _write("****************************************GAME OVER*******************************************")
        _write("********************************************************************************************")
        _write("********************************************************************************************")
        _write("********************************************************************************************")
        _write(" ")
        _write("\n But how are gonna get back home?")
        _write("\n PART II COMING SOON..")

    elif _matches(key, "open"):
        _write("------------------------------------------------------")
        _write("You don't have a key.")
        _write("------------------------------------------------------")
        treasure_chest()
    elif _matches(key, "destroy"):
        _write("------------------------------------------------------")
        _write("With what?? TRY AGAIN!")
        _write("------------------------------------------------------")
        treasure_chest()

    elif _matches(key, "wreck"):
        _write("------------------------------------------------------")
        _write("With your hands wreck-it-ralph? TRY AGAIN!")
        _write("------------------------------------------------------")
        treasure_chest()

    elif _matches(key, "throw"):
        _write("------------------------------------------------------")
        _write("You just got the chest and now you wanna get rid of it? TRY AGAIN!")
        _write("------------------------------------------------------")
        treasure_chest()

    elif _matches(key, "back"):
        back()

    else:
        no_idea()
        treasure_chest()


def back():
    _scene("chest_finale")
    _write("------------------------------------------------------")
    _write("Are you sure? You wanna go back?")
    _write("------------------------------------------------------")

    go_back = _read(">>> ")

    if _matches(go_back, "yes"):
        _write("\n ------------------------------------------------------")
        _write("\n They caught you and killed ya.")
        _write("------------------------------------------------------ \n")
        check_point()

    elif _matches(go_back, "no"):
        _write("\n------------------------------------------------------")
        _write("\n GOOD! Think again.")
        _write("------------------------------------------------------")
        treasure_chest()

    else:
        no_idea()
        treasure_chest()


# --------------------------------------------------------------------------------------------------------------------------------
def no_idea():
    _write("\n")
    _write("\t\t\t>>>SORRY. I HAVE NO IDEA WHAT YOU'RE SAYING. PLEASE TRY AGAIN.<<<")

# --------------------------------------------------------------------------------------------------------------------------------


def restarter():
    _scene("death")
    _write("------------------------------------------------------------------------")
    _write("YOU JUST DIED...")
    _write("------------------------------------------------------------------------")
    _write("""Will you start the game again?
YES or NO""")
    restart = _read(">>> ")

    if _matches(restart, "yes"):
        _write("------------------------------------------------------------------------")
        _write("\nWELCOME BACK!")
        name()

    if _matches(restart, "no"):
        _write("------------------------------------------------------------------------")
        _write("BYE!")


def name():
    _scene("intro")
    _write("Before we start, kindly FULL SCREEN your terminal.")
    _write("After you do, tell us your name, player!")

    player = _read("Name: ")
    _write(" ")
    _write("********************************************************************************************")
    _write("********************************************************************************************")
    _write("********************************************************************************************")
    _write("***********************************DIAMOND IN BLACK PEARL***********************************")
    _write("********************************************************************************************")
    _write("********************************************************************************************")
    _write("********************************************************************************************")
    _write(" ")
    _write(f"Welcome to the the game {player}!")
    _write("Here are some rules to this game:")
    _write("1. Read everything carefully!")
    _write("2. TYPE IN THE CAPS LOCKED KEYWORDS for all of your answers!")
    _write("3. Use your imagination and common sense :))")
    _write("4. Enjoy!! ;)")
    _write("--------------------------------")
    start()


def check_point():
    _scene("checkpoint_death")
    _write("------------------------------------------------------------------------")
    _write("YOU JUST DIED...")
    _write("------------------------------------------------------------------------")
    _write("""Will you start on the CHECKPOINT again?
YES or NO""")
    restart = _read(">>> ")

    if _matches(restart, "yes"):
        _write("------------------------------------------------------------------------")
        _write("\nWELCOME BACK!")
        _write("------------------------------------------------------------------------")
        the_pirate()

    if _matches(restart, "no"):
        _write("------------------------------------------------------------------------")
        _write("BYE!")

