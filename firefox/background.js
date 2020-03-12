var app = {};

// Generate referer uri
app.generateReferer = function () {
  var linkId = (1 + Math.random()).toString(36).substring(2, 12);
  return `https://t.co/${linkId}`;
}

// Modify the referer to twitter
app.modifyHeaders = function (details) {
  var newRef = app.generateReferer();
  var refExists = false;
  for (var n in details.requestHeaders) {
    refExists = details.requestHeaders[n].name.toLowerCase() == "referer";
    if (refExists) {
      details.requestHeaders[n].value = newRef;
      break;
    }
  }
  if (!refExists) {
    details.requestHeaders.push({ name: "Referer", value: newRef });
  }
  return { requestHeaders: details.requestHeaders };
}

// Modify network requests
browser.webRequest.onBeforeSendHeaders.addListener(
  app.modifyHeaders,
  {
    urls: [
      '*://*.medium.com/*',
      '*://writingcooperative.com/*',
      '*://psiloveyou.xyz/*',
      '*://uxplanet.org/*',
      '*://towardsdatascience.com/*',
      '*://codeburst.io/*',
      '*://*.gitconnected.com/*',
      '*://itnext.io/*',
      '*://entrepreneurshandbook.co/*',
      '*://arcdigital.media/*',
      '*://femsplain.com/*',
      '*://fityourself.club/*',
      '*://byrslf.co/*',
      '*://blog.qz.com/*',
      '*://bullshit.ist/*',
      '*://*.pramp.com/*',
      '*://uxdesign.cc/*',
      '*://medium.muz.li/*',
      '*://*.usejournal.com/*',
      '*://timeline.com/*',
      '*://substance.media/*',
      '*://thebolditalic.com/*',
      '*://thecreative.cafe/*',
      '*://theascent.pub/*',
      '*://ceoplaybook.io/*',
      '*://dayoneperspective.com/*',
      '*://eand.co/*',
      '*://extranewsfeed.com/*',
      '*://democracyguardian.com/*',
      '*://*.issuevoter.org/*',
    ]
  },
  [
    'blocking',
    'requestHeaders'
  ]
);
