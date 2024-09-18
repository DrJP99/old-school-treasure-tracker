# Old-School Treasure Tracker

A treasure tracker for Old-School Roleplaying Games. Designed for [Old School Essentials](https://necroticgnome.com/products/old-school-essentials-rules-tome) by Gavin Norman.

Add your Player Characters, Retainers, Treasure and quickly calculate how big is each person's share of Treasure and XP once they return to town.

### Feats of Exploration

Although "Feats of Exploration" are not part of the _OSE_ rules, _3D6 Down The Line_ has created a great supplement detailing rules to award player characters with Experience Points for exploring dungeons, cities and wilderness. You can find the rules [here](https://www.drivethrurpg.com/en/product/454780/feats-of-exploration).

### Local Storage

The whole web app is client side, that means that there is no server storing your session or receiving information about how you use the web app.

## Running Your Instance Locally

1. Open a console and clone the git repository

```(bash)
git clone https://github.com/DrJP99/old-school-treasure-tracker.git
```

2. Go to the repository folder

```(bash)
cd old-school-treasure-tracker
```

3. Install dependencies (you should have npm installed), this may take a while

```(bash)
npm install
```

4. Run `start` script

```(bash)
npm start
```

After the server is up and running, go to your browser and go to [localhost:3000](http://localhost:3000) and you should see the web app.

## Future Development

Here are some features I would like to develop in future versions:

- [ ] **Archive characters**. Instead of deleting your characters whenever a player is unable to make it to the session, you can archive a character and quickly add them back to the game next session.
- [ ] **Dungeon Tracker**. When exploring a dungeon, mark off previous turns, add effects with durations (such as lighting a torch, casting a sleep spell) or create your own, be notified whenever a random happening occurs, etc.  

## Tools

- React
- TypeScript
- SCSS