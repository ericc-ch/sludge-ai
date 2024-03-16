import { model } from "../model";
import { SAFETY_SETTINGS } from "../safety-settings";

export async function generateImages(subtitlesJSON: string) {
  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const parts = [
    {
      text: "You are a YouTube Shorts/TikTok video editor. Your audience is people from age 18 to age 40. You take the transcript of your short and put a stock image from the internet to illustrate the narrated sentences. I will give you a JSON data containing the scripts and their timestamp. The JSON data contains `text` property, which is the line that should be read. The JSON data also contains `from` property and `to` property, which are the timestamps at which the `text` property is read in milliseconds. Understand the script and break up the sections according to your best judgement. Don't make each segment too short or too long. For each section, you will generate a search query for the image that you want to put. Every image search query should only be 2 to 3 words long. For example, if the script is talking about someone playing piano, the search query should be \"Person playing piano\". The searched image should help illustrate what is happening in the script.Output your respond in JSON array with this format (mostly the same as the input):- `from` -> This is the timestamp at which the image first shown in milliseconds- `to` -> This is the timestamp at which the image last shown in milliseconds- `search` -> String containing the search query. Remember, the timestamps in the output don't need to match exactly with the input. The output timestamps should be matched with the video sections that you broke up.",
    },
    {
      text: 'input: {"subtitles":[{"from":100,"to":3337,"text":"When I was 14 and my sister Sarah was 22"},{"from":3750,"to":5787,"text":"she found out she was having a baby with her"},{"from":5800,"to":9200,"text":"boyfriend Paul They planned to get married but things got"},{"from":9213,"to":12912,"text":"tough around the 4th or 5th month Being pregnant wasn\'t"},{"from":12938,"to":15925,"text":"easy for her She felt awful most of the time"},{"from":16300,"to":19675,"text":"and it seemed like everything hurt To top it off"},{"from":19988,"to":23475,"text":"Paul didn\'t understand what she was going through He\'d even"},{"from":23488,"to":28000,"text":"get annoyed when she complained saying things like Everyone experiences"},{"from":28012,"to":32288,"text":"pregnancy differently As the due date approached things became even"},{"from":32300,"to":36062,"text":"more stressful Sarah really wanted to avoid giving birth on"},{"from":36075,"to":40212,"text":"Valentine\'s Day but there\'s no controlling these things The big"},{"from":40225,"to":42425,"text":"day arrived and while I was too young to be"},{"from":42438,"to":45987,"text":"in the delivery room I remember feeling frustrated that Paul"},{"from":46000,"to":49025,"text":"wouldn\'t go in either He claimed he couldn\'t handle the"},{"from":49038,"to":52237,"text":"sight of it which really upset me He just didn\'t"},{"from":52250,"to":55038,"text":"seem to get what my sister was going through After"},{"from":55050,"to":59712,"text":"a long labor my nephew finally arrived right on Valentine\'s"},{"from":59725,"to":65588,"text":"Day Sadly there were complications During surgery doctors discovered a"},{"from":65600,"to":70350,"text":"large non-cancerous growth in Sarah\'s uterus They had to remove"},{"from":70362,"to":73175,"text":"it completely meaning she wouldn\'t be able to have any"},{"from":73188,"to":76487,"text":"more children It was a lot to take in especially"},{"from":76500,"to":80300,"text":"while still recovering from childbirth While Sarah was in surgery"},{"from":80625,"to":83737,"text":"Paul took care of the baby He seemed worried at"},{"from":83750,"to":88700,"text":"first but then my older brother Zeke noticed something strange"},{"from":89062,"to":92450,"text":"Paul was filling out the birth certificate including the baby\'s"},{"from":92463,"to":95037,"text":"name Zeke found it odd that he wouldn\'t wait for"},{"from":95050,"to":97987,"text":"Sarah to wake up but Paul claimed he just wanted"},{"from":98000,"to":101725,"text":"her to rest Here\'s the crazy part despite knowing how"},{"from":101737,"to":105675,"text":"much Sarah disliked the name Paul wrote down Valentino on"},{"from":105688,"to":108862,"text":"the birth certificate the same name his family had been"},{"from":108875,"to":112412,"text":"pushing for He even had his parents sign as witnesses"},{"from":112775,"to":116638,"text":"claiming Sarah had already approved it Of course that was"},{"from":116650,"to":120338,"text":"completely untrue As soon as Sarah was well enough she"},{"from":120350,"to":123862,"text":"changed the baby\'s name and ended things with Paul He"},{"from":123875,"to":127713,"text":"vanished for a while and then six months later she"},{"from":127725,"to":131088,"text":"saw his wedding photos online Turns out he had been"},{"from":131100,"to":134037,"text":"cheating on her well before the baby was even born"},{"from":134400,"to":136650,"text":"It was a lot for Sarah to deal with but"},{"from":136662,"to":139812,"text":"she stayed strong She raised her son on her own"},{"from":140213,"to":143875,"text":"filed for child support and eventually moved on with her"},{"from":143887,"to":147475,"text":"life It wasn\'t easy but she proved she could handle"},{"from":147550,"to":148950,"text":"anything life threw her way"}]}',
    },
    {
      text: 'output: [{"from":100,"to":12912,"search":"Pregnant"},{"from":12938,"to":28000,"search":"man and woman arguing"},{"from":28012,"to":40212,"search":"valentine\'s day"},{"from":40225,"to":49025,"search":"hospital room"},{"from":49038,"to":55038,"search":"woman giving birth"},{"from":55050,"to":59712,"search":"newborn baby"},{"from":59725,"to":70350,"search":"doctor"},{"from":70362,"to":80300,"search":"woman sad"},{"from":80625,"to":88700,"search":"man holding baby"},{"from":89062,"to":97987,"search":"signing paper"},{"from":98000,"to":116638,"search":"man and woman arguing"},{"from":116650,"to":127713,"search":"signing paper"},{"from":127725,"to":134037,"search":"wedding"},{"from":134400,"to":148950,"search":"woman sad"}]',
    },
    {
      text: 'input: {"subtitles":[{"from":100,"to":4013,"text":"My husband Mark had been acting strange lately He was"},{"from":4025,"to":8188,"text":"working late coming home smelling of perfume and avoiding eye"},{"from":8200,"to":11613,"text":"contact My gut told me something was wrong but I"},{"from":11625,"to":14988,"text":"couldn\'t bring myself to confront him So I hatched a"},{"from":15000,"to":18550,"text":"plan I would go undercover as a maid and infiltrate"},{"from":18562,"to":22012,"text":"his office I bought a cheap maid\'s uniform complete with"},{"from":22025,"to":24475,"text":"a mop and bucket and set out to catch Mark"},{"from":24488,"to":27600,"text":"in the act I arrived at his office building early"},{"from":27613,"to":30812,"text":"and slipped into the uniform I then proceeded to clean"},{"from":30825,"to":33475,"text":"the hallways all the while keeping an eye out for"},{"from":33487,"to":37325,"text":"Mark After an hour of cleaning I finally spotted him"},{"from":37688,"to":40763,"text":"He was in his office with his door closed I"},{"from":40775,"to":44938,"text":"took a deep breath and knocked Housekeeping I announced Mark"},{"from":44962,"to":48800,"text":"opened the door and his eyes widened in surprise Uh"},{"from":48900,"to":51800,"text":"I don\'t need any cleaning today he said I\'m just"},{"from":51812,"to":55975,"text":"about to leave I smiled and said No problem sir"},{"from":56337,"to":59188,"text":"I\'ll just finish up in here I stepped into his"},{"from":59200,"to":62263,"text":"office and began to tidy up his desk As I"},{"from":62275,"to":65312,"text":"did I couldn\'t help but notice a framed photo of"},{"from":65325,"to":68950,"text":"a woman on his desk She was beautiful with long"},{"from":68963,"to":72862,"text":"dark hair and piercing blue eyes I felt a pang"},{"from":72875,"to":75338,"text":"of jealousy Could this be the woman he was cheating"},{"from":75350,"to":78050,"text":"on me with I decided to take a closer look"},{"from":78062,"to":81575,"text":"at the photo As I leaned in I gasped It"},{"from":81588,"to":84725,"text":"was me I was the woman in the photo Mark"},{"from":84737,"to":86700,"text":"had framed a photo of me and put it on"},{"from":86713,"to":91075,"text":"his desk I was so relieved and embarrassed I quickly"},{"from":91088,"to":94838,"text":"finished cleaning up and left the office I confronted Mark"},{"from":94850,"to":97938,"text":"later that night and told him about my little adventure"},{"from":98300,"to":100825,"text":"He laughed and said he had been planning to surprise"},{"from":100838,"to":103450,"text":"me with a framed photo of us for our anniversary"},{"from":103812,"to":106013,"text":"He had no idea I would go to such lengths"},{"from":106025,"to":108987,"text":"to catch him cheating We both had a good laugh"},{"from":109125,"to":112425,"text":"and our relationship is stronger than ever I guess you"},{"from":112438,"to":114350,"text":"could say I cleaned up pretty well that day"}]}',
    },
    {
      text: 'output: [{"from":100,"to":4013,"search":"man working late"},{"from":4025,"to":8188,"search":"man and woman"},{"from":8200,"to":11613,"search":"woman thinking"},{"from":11625,"to":14988,"search":"maid outfit"},{"from":15000,"to":18550,"search":"woman in disguise"},{"from":18562,"to":22012,"search":"maid"},{"from":22025,"to":24475,"search":"maid cleaning"},{"from":24488,"to":27600,"search":"office building"},{"from":27613,"to":30812,"search":"maid cleaning"},{"from":30825,"to":33475,"search":"office building"},{"from":33487,"to":37325,"search":"man in office"},{"from":37688,"to":40763,"search":"office door"},{"from":40775,"to":44938,"search":"housekeeper"},{"from":44962,"to":48800,"search":"surprised man"},{"from":48900,"to":51800,"search":"man talking"},{"from":51812,"to":55975,"search":"housekeeper"},{"from":56337,"to":59188,"search":"maid cleaning desk"},{"from":59200,"to":62263,"search":"man desk"},{"from":62275,"to":65312,"search":"photo on desk"},{"from":65325,"to":68950,"search":"woman in photo"},{"from":68963,"to":72862,"search":"woman looking at photo"},{"from":72875,"to":75338,"search":"woman jealous"},{"from":75350,"to":78050,"search":"woman looking at photo"},{"from":78062,"to":81575,"search":"gasp"},{"from":81588,"to":84725,"search":"photo"},{"from":84737,"to":86700,"search":"photo on desk"},{"from":86713,"to":91075,"search":"woman relieved"},{"from":91088,"to":94838,"search":"maid cleaning"},{"from":94850,"to":97938,"search":"man and woman talking"},{"from":98300,"to":100825,"search":"man laughing"},{"from":100838,"to":103450,"search":"couple anniversary"},{"from":103812,"to":106013,"search":"man and woman laughing"},{"from":106025,"to":108987,"search":"couple laughing"},{"from":109125,"to":112425,"search":"couple laughing"},{"from":112438,"to":114350,"search":"maid cleaning"}]',
    },
    { text: `input: ${subtitlesJSON}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings: SAFETY_SETTINGS,
  });

  const { response } = result;
  return response.text();
}