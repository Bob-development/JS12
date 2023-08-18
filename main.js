'use strict'

const heroes = [
  {
    heroName : 'Shadow Fiend',
    HP : 650,
    manapool : 400,
    damage : 55,
    defence : 0.25,
    magicResist : 0.25,
    spells : [
      {
        spellName : 'Shadow Raze',
        spellDmg : 90,
        typeOfDmg : 'Magic',
        manaCost : 100
      },
      
      {
        spellName : 'Requiem',
        spellDmg : 130,
        typeOfDmg : 'Magic',
        manaCost : 200
      },
    ]
  },

  {
    heroName : 'Invoker',
    HP : 750,
    manapool : 600,
    damage : 65,
    defence : 0.4,
    magicResist : 0.35,
    spells : [
      {
        spellName : 'Sun Strike',
        spellDmg : 120,
        typeOfDmg : 'Clear',
        manaCost : 150
      },
      
      {
        spellName : 'Tornado',
        spellDmg : 60,
        typeOfDmg : 'Magic',
        manaCost : 200
      },

      {
        spellName : 'EMP',
        spellDmg : 30,
        typeOfDmg : 'Magic',
        manaCost : 100
      }
    ]
  },

  {
    heroName : 'Pudge',
    HP : 850,
    manapool : 200,
    damage : 60,
    defence : 0.5,
    magicResist : 0.1,
    spells : [
      {
        spellName : 'Hook',
        spellDmg : 100,
        typeOfDmg : 'Clear',
        manaCost : 115
      },
      
      {
        spellName : 'Dismember',
        spellDmg : 150,
        typeOfDmg : 'Magic',
        manaCost : 120
      }
    ]
  },

  {
    heroName : 'Dazzle',
    HP : 550,
    manapool : 450,
    damage : 53,
    defence : 0.1,
    magicResist : 0.35,
    spells : [
      {
        spellName : 'Poison',
        spellDmg : 50,
        typeOfDmg : 'Magic',
        manaCost : 80
      }
    ]
  },

  {
    heroName : 'Tinker',
    HP : 600,
    manapool : 500,
    damage : 48,
    defence : 0.15,
    magicResist : 0.5,
    spells : [
      {
        spellName : 'Laser',
        spellDmg : 120,
        typeOfDmg : 'Magic',
        manaCost : 150
      }, 
      
      {
        spellName : 'Rockets',
        spellDmg : 80,
        typeOfDmg : 'Magic',
        manaCost : 120
      }
    ]
  }
]

let isRunning = true;
let myHero;
let enemyHero;

while (isRunning){
  let choiceOfPlay = prompt("Would u like to go 1x1 solo mid?");
  
  if (choiceOfPlay[0].toLowerCase() === 'y'){
    const choiceOfMyHero = prompt("Which hero u wanna pick?\n1)Shadow Fiend;  2)Invoker;  3)Pudge;  4)Oracle;  5)Tinker;  6)Random;");
    chooseMyHero(choiceOfMyHero);
    console.log('Ur hero : ',myHero);

    const choiceOfEnemyHero = prompt("Which hero for ur enemy u wanna pick?\n1)Shadow Fiend;  2)Invoker;  3)Pudge;  4)Oracle;  5)Tinker;  6)Random;");
    chooseEnemyHero(choiceOfEnemyHero);
    console.log('Enemy hero : ',enemyHero);

    battle(myHero, enemyHero);

  } else isRunning = false;
}


function battle(hero1, hero2) {
  let isBattle = true;

  while(isBattle){
    let heroesBattle = prompt(`${myHero['heroName']}(${myHero['HP']}) VS ${enemyHero['heroName']}(${enemyHero['HP']})\n1)Kick him(use ur own dmg);  \n2)Choose spell; \n3)Random attack`);
  
    switch (heroesBattle) {
      case '1':
        calclPhysicResist(hero2, hero1['damage']);        //CALC PHYSIC RESIST HERO2
        
        const secondHeroAttack = getAttack(hero2, 0, 4);  //GET WHICH ATTACK WILL KICK HERO2
        hero2Attack(hero2,hero1,secondHeroAttack);        //HERO2 ATTACK
        
        if(hero1['HP'] < 0){
          alert(hero2['heroName'] + "WIN")
          isBattle = false;
          break;
        }
        else if(hero2['HP'] < 0){
          alert(hero1['heroName'] + "WIN");
          isBattle = false;
          break;
        }
        // winner(hero1,hero2,isBattle);
        
        alert(`${hero1['heroName']} = ${hero1['HP']}\n${hero2['heroName']} = ${hero2['HP']}`);
        break;
  
      case '2':
        const heroSpellDmg = chooseSpell(hero1);

        const heroMana = heroManapool(hero1,heroSpellDmg);

        if(heroMana < 0){
          alert("U cant choose ur spell, cause ur manapool is empty");
          break;
        }

        calclMagicResist(hero2,heroSpellDmg);

        const Hero2Attack = getAttack(hero2, 0, 4);
        hero2Attack(hero2,hero1,Hero2Attack);
        
        alert(`${hero1['heroName']} = ${hero1['HP']}\n${hero2['heroName']} = ${hero2['HP']}`);
        break;
    
      case '3':
        const firstHeroAttack = getAttack(hero1, 0, 4);
        hero1Attack(hero2,hero1,firstHeroAttack);

        const secondHeroRandAttack = getAttack(hero2, 0, 4);
        hero2Attack(hero2,hero1,secondHeroRandAttack);

        if(hero1['HP'] < 0){
          alert(hero2['heroName'] + "WIN")
          isBattle = false;
          break;
        }
        else if(hero2['HP'] < 0){
          alert(hero1['heroName'] + "WIN");
          isBattle = false;
          break;
        }

        alert(`${hero1['heroName']} = ${hero1['HP']}\n${hero2['heroName']} = ${hero2['HP']}`);
        break;
  
      default:
        break;
    }
  }
}

//FUNC THAT WILL SAID WHO IS WINNER
function winner(hero1,hero2,isBattle) {    //????
  if(hero1['HP'] < 0){
    alert(hero2['heroName'] + "WIN")
    isBattle = false;
  }
  else if(hero2['HP'] < 0){
    alert(hero1['heroName'] + "WIN");
    isBattle = false;
  }

  return isBattle;
}

// FUNC THAT WILL CONSIDER MANAPOOL OF HEROES
function heroManapool(hero,spellDmg) {
  // let heroMana = hero['manapool'];

  for(const el of hero['spells']){
    if(el['spellDmg'] === spellDmg){
      hero['manapool'] -= el['manaCost'];
      let heroMana = hero['manapool'];
      return heroMana;
    }
  }
}


// FUNC THAT WILL CALC RANDOM HERO2 DMG
function hero2Attack(hero2,hero1,attack) {
  if(attack = hero2['damage']){
    calclPhysicResist(hero1, attack);
  } else calclMagicResist(hero1, attack);

  return hero1['HP'];
}

// FUNC THAT WILL CALC RANDOM HERO1 DMG
function hero1Attack(hero2,hero1,attack) {
  if(attack = hero1['damage']){
    calclPhysicResist(hero2, attack);
  } else calclMagicResist(hero2, attack);

  return hero2['HP'];
}

// FUNC THAT WILL CALC MAGIC DMG
function calclMagicResist(hero,dmg) {
   hero['HP'] = hero['HP'] - dmg + dmg * hero['magicResist'];
   return hero['HP'];
}

// FUNC THAT WILL CALC PHYSIC DMG
function calclPhysicResist(hero,dmg) {
  hero['HP'] = hero['HP'] - dmg + dmg * hero['defence'];
  return hero['HP'];
}

//FUNC THAT WILL CHOOSE HERO WICH U WANNA PLAY
function chooseMyHero(pick) {  //if myhero....
    switch (pick) {
      case '1':
        myHero = heroes[0];
        break;

      case '2':
        myHero = heroes[1];
        break;

      case '3':
        myHero = heroes[2];
        break;

      case '4':
        myHero = heroes[3];
        break;

      case '5':
        myHero = heroes[4];
        break;

      case '6':
        myHero = heroes[getRandomNumber(0,5)]
        break;
    
      default:
        break;
    }
}

//FUNC THAT WILL CHOOSE HERO WICH UR ENEMY WANNA PLAY 
function chooseEnemyHero(pick) {
  switch (pick) {
    case '1':
      enemyHero = heroes[0];
      break;

    case '2':
      enemyHero = heroes[1];
      break;

    case '3':
      enemyHero = heroes[2];
      break;

    case '4':
      enemyHero = heroes[3];
      break;

    case '5':
      enemyHero = heroes[4];
      break;

    case '6':
      enemyHero = heroes[getRandomNumber(0,5)]
      break;
  
    default:
      break;
  }
}

//FUNC THAT WILL MAKE RAND NUM TO CHOOSE HERO OR ATTACK
function getRandomNumber(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return +randomNum.toString()[0];
}

//FUNC THAT CHOOSE HOW ENEMY WILL ATTACK   
function getAttack(hero, min, max) {
  let randomNum = Math.random() * (max - min) + min;
  randomNum = +randomNum.toString()[0];

  let heroAttack;
  switch (randomNum) {
    case '0':
      heroAttack = hero['damage']
      break;

    case '1':
      heroAttack = hero.spells[0]['spellDmg'];
      break;

    case '2':
      heroAttack = hero.spells[1]['spellDmg'];
      break;

    case '3':
      heroAttack = hero.spells[2]['spellDmg'];
      break;
  
    default:
      break;
  }

  return heroAttack;
}

//FUNC THAT CHOOSE SPELL
function chooseSpell(hero1) {
  let heroSpells = '';

  for(const el of hero1['spells']){
    if(el === hero1['spells'][0]){
      heroSpells += el.spellName;
    } else heroSpells += ", " + el.spellName;
  }

  let isValidSpell = false;
  let choicedSpellDMG;

  while(!isValidSpell){
    const choicedSpell = prompt(`Choose ur spell ${heroSpells}`);
  
    for(const el of hero1['spells']){
      if(choicedSpell.toLocaleLowerCase().replace(/\s+/g, "") === el['spellName'].toLocaleLowerCase().replace(/\s+/g, "")){
        choicedSpellDMG = el['spellDmg'];
        isValidSpell = true;
        break;
      }
    }

    if(typeof(choicedSpellDMG) === "undefined"){
      alert("Ur spell name is incorrect, try again");
    }
  }

  return choicedSpellDMG;
}