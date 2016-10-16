# relevancy
relevancy api

on Heroku

https://pier21.herokuapp.com/

sample request:
https://pier21.herokuapp.com/article?url=http://edition.cnn.com/2016/10/15/africa/niger-us-kidnap/index.html

sample response:
```

{
  feedback: "1",
  id: 6,
  keywords: "{'kill': 1, 'hit': 1, 'killed': 1, 'die': 1, 'injure': 1}",
  relevancy: "0.30",
  text: "Many of those directly affected by the attack also attended the ceremony of remembrance in Nice. The names of the 86   people who died were read out, and a white rose was laid down for each of them. Hollande paid tribute to the families         affected and said the nation wanted to show its compassion and solidarity with them. "It should have been a moment of joy,     but it was hell," Hollande said. "Within barely four minutes, a lorry at full speed hit a peaceful crowd, it transformed       the Promenade des Anglais into a cemetery. "The terrorist had planned his attack; he had prepared to accomplish it coldly,     with the full aim of killing people." Ten children were among the victims of the ISIS-inspired attack. More than 200 people   were injured. The July 14 attack was the third such terrorist assault on French soil in 18 months. Investigations continue     into the circumstances around the attack. Police killed Bouhlel at the scene. Questions about how the truck was able to       enter a crowded area during this high-profile event and what security measures were in place have not been answered.           Survivor Greg Krentzman, an American married to a Frenchwoman, is one of the victims who remains in the hospital. His leg     was fractured in eight places, but he counts himself as lucky still to be alive. His 10-year-old daughter was also hurt. "I   have a lot of anger when I think about it. 'Why me?' of course comes up, I mean how could it be me and my family?" he told C   CNN. France has been under a state of emergency since the Paris terror attacks in November, and authorities have struggled     to monitor thousands of domestic radicals on their radar.",
  title: "France pays tribute to Nice attack victims"
}
```

To Run:


`pip install -r requirements.txt`

`export DATABASE_URL= {url to psql db}`

`python create_db.py`

`python views.py`

call:

`curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://127.0.0.1:5000/article?url=http://www.google.com`


