import React from 'react';

// bold words surrounded by *
export function bold(sentence) {
  let sections = sentence.split('*');
  if (sections.length == 1) return sentence
  return sections.map((text, index) => {
    if (index % 2 == 0) return text
    return <b key={index}>{text}</b>
  })
}

// Similar to maptual's export function
export function openExternalUrl(getCSV) {
  getCSV.then(response => {
    window.open(
      response.data,
      '_blank'
    )
    return response;
  }).catch(error => {
  });
}