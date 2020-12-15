/* const visitorUser = {
  id: 2,
  first_name: 'Houssam',
  last_name: 'Laghzil',
  email: 'esteban2@mail.com',
  birth_date: '11/09/1999',
  profile_picture: '/img/profilepic/2.png',
  description: 'In occaecat aute eiusmod cupidatat consequat aliquip exercitation. Esse quis labore dolor minim in commodo ad do id consequat occaecat et tempor. Do est cupidatat Lorem sit aliquip.'
}

const visitedUser = {
  id: 5,
  first_name: 'Juan',
  last_name: 'Fernando Herrada',
  email: 'esteban2@mail.com',
  birth_date: '13/08/2000',
  profile_picture: '/img/profilepic/2.png',
  description: 'In occaecat aute eiusmod cupidatat consequat aliquip exercitation. Esse quis labore dolor minim in commodo ad do id consequat occaecat et tempor. Do est cupidatat Lorem sit aliquip.'
}

*/

function getAstrologicalSign (date) { // A voir selon le format de la date
  const dateTab = date.split('/')
  const day = parseInt(dateTab[0])
  const month = parseInt(dateTab[1])
  var sign = ''
  switch (month) {
    case 1 :
      if (day < 21) {
        sign = 'Capricorne'
      } else {
        sign = 'Verseau'
      }
      break
    case 2 :
      if (day < 19) {
        sign = 'Verseau'
      } else {
        sign = 'Poissons'
      }
      break
    case 3 :
      if (day < 21) {
        sign = 'Poissons'
      } else {
        sign = 'Bélier'
      }
      break
    case 4 :
      if (day < 21) {
        sign = 'Bélier'
      } else {
        sign = 'Taureau'
      }
      break
    case 5 :
      if (day < 21) {
        sign = 'Taureau'
      } else {
        sign = 'Gémeaux'
      }
      break
    case 6 :
      if (day < 22) {
        sign = 'Gémeaux'
      } else {
        sign = 'Cancer'
      }
      break
    case 7 :
      if (day < 23) {
        sign = 'Cancer'
      } else {
        sign = 'Lion'
      }
      break
    case 8 :
      if (day < 23) {
        sign = 'Lion'
      } else {
        sign = 'Vierge'
      }
      break
    case 9 :
      if (day < 23) {
        sign = 'Vierge'
      } else {
        sign = 'Balance'
      }
      break
    case 10 :
      if (day < 23) {
        sign = 'Balance'
      } else {
        sign = 'Scorpion'
      }
      break
    case 11 :
      if (day < 23) {
        sign = 'Scorpion'
      } else {
        sign = 'Sagittaire'
      }
      break
    case 12 :
      if (day < 22) {
        sign = 'Sagittaire'
      } else {
        sign = 'Capricorne'
      }
      break
  }
  return sign
}

const signsCompat = { // Note de 1 à 5 pour les signes
  Bélier: {
    Bélier: 4,
    Taureau: 2,
    Gémeaux: 4,
    Cancer: 2,
    Lion: 5,
    Vierge: 1,
    Balance: 3,
    Scorpion: 3,
    Sagittaire: 5,
    Capricorne: 3,
    Verseau: 4,
    Poissons: 1
  },
  Taureau: {
    Bélier: 2,
    Taureau: 5,
    Gémeaux: 1,
    Cancer: 4,
    Lion: 3,
    Vierge: 5,
    Balance: 3,
    Scorpion: 3,
    Sagittaire: 1,
    Capricorne: 5,
    Verseau: 2,
    Poissons: 4
  },
  Gémeaux: {
    Bélier: 4,
    Taureau: 1,
    Gémeaux: 5,
    Cancer: 1,
    Lion: 4,
    Vierge: 2,
    Balance: 5,
    Scorpion: 1,
    Sagittaire: 3,
    Capricorne: 2,
    Verseau: 5,
    Poissons: 1
  },
  Cancer: {
    Bélier: 2,
    Taureau: 4,
    Gémeaux: 1,
    Cancer: 5,
    Lion: 3,
    Vierge: 4,
    Balance: 1,
    Scorpion: 5,
    Sagittaire: 2,
    Capricorne: 4,
    Verseau: 2,
    Poissons: 5
  },
  Lion: {
    Bélier: 5,
    Taureau: 3,
    Gémeaux: 4,
    Cancer: 3,
    Lion: 5,
    Vierge: 1,
    Balance: 4,
    Scorpion: 3,
    Sagittaire: 5,
    Capricorne: 2,
    Verseau: 2,
    Poissons: 3
  },
  Vierge: {
    Bélier: 1,
    Taureau: 5,
    Gémeaux: 2,
    Cancer: 4,
    Lion: 1,
    Vierge: 5,
    Balance: 2,
    Scorpion: 4,
    Sagittaire: 1,
    Capricorne: 5,
    Verseau: 2,
    Poissons: 2
  },
  Balance: {
    Bélier: 3,
    Taureau: 3,
    Gémeaux: 5,
    Cancer: 1,
    Lion: 4,
    Vierge: 2,
    Balance: 5,
    Scorpion: 2,
    Sagittaire: 4,
    Capricorne: 2,
    Verseau: 5,
    Poissons: 3
  },
  Scorpion: {
    Bélier: 3,
    Taureau: 3,
    Gémeaux: 1,
    Cancer: 5,
    Lion: 3,
    Vierge: 4,
    Balance: 2,
    Scorpion: 5,
    Sagittaire: 2,
    Capricorne: 4,
    Verseau: 2,
    Poissons: 5
  },
  Sagittaire: {
    Bélier: 5,
    Taureau: 1,
    Gémeaux: 3,
    Cancer: 2,
    Lion: 5,
    Vierge: 1,
    Balance: 4,
    Scorpion: 2,
    Sagittaire: 5,
    Capricorne: 1,
    Verseau: 4,
    Poissons: 2
  },
  Capricorne: {
    Bélier: 3,
    Taureau: 5,
    Gémeaux: 2,
    Cancer: 4,
    Lion: 2,
    Vierge: 5,
    Balance: 2,
    Scorpion: 4,
    Sagittaire: 1,
    Capricorne: 5,
    Verseau: 2,
    Poissons: 4
  },
  Verseau: {
    Bélier: 4,
    Taureau: 2,
    Gémeaux: 5,
    Cancer: 2,
    Lion: 2,
    Vierge: 2,
    Balance: 5,
    Scorpion: 2,
    Sagittaire: 4,
    Capricorne: 2,
    Verseau: 5,
    Poissons: 3
  },
  Poissons: {
    Bélier: 1,
    Taureau: 4,
    Gémeaux: 1,
    Cancer: 5,
    Lion: 3,
    Vierge: 2,
    Balance: 3,
    Scorpion: 5,
    Sagittaire: 2,
    Capricorne: 4,
    Verseau: 3,
    Poissons: 5
  }
}

function supprAccCarSpec (a) {
  if (typeof a === 'string') {
    var str = a
    var tabAccentBrut = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ'
    var tabSansAccentBrut = 'aaaaaaaaaaaaooooooooooooeeeeeeeecciiiiiiiiuuuuuuuuynn'
    var tabAccent = tabAccentBrut.split('')
    var tabSansAccent = tabSansAccentBrut.split('')
    var tabCorrAcc = []
    var i = -1
    while (tabAccent[++i]) {
      tabCorrAcc[tabAccent[i]] = tabSansAccent[i]
    }
    tabCorrAcc['Œ'] = 'OE'
    tabCorrAcc['œ'] = 'oe'
    str = str.replace(/./g, function ($0) {
      return (tabCorrAcc[$0]) ? tabCorrAcc[$0] : $0
    })
    str = str.replace(/&amp;/g, '_')
    str = str.replace(/_amp;/g, '')
    str = str.replace(/&lt;/g, '_')
    str = str.replace(/_lt;/g, '_')
    str = str.replace(/&gt;/g, '_')
    str = str.replace(/_gt;/g, '_')
    str = str.replace(/(-| |#|"|@|:|\.|,|;|'|%|!|²|=|÷|\+|\?|\/|\[|\]|\{|\}|\*|\^|\$|\\|`|"|'|¨|€|£|¤|µ|§|~|ƒ|„|©|°)/g, '_')
    return str
  }
}

function alphabetPosition (text) {
  var result = ''
  for (var i = 0; i < text.length; i++) {
    text = supprAccCarSpec(text)
    var code = text.toUpperCase().charCodeAt(i)
    if (code > 64 && code < 91) result += (code - 64) + ' '
  }
  return result.slice(0, result.length - 1)
}

function getLetterValue (letter) {
  const position = alphabetPosition(letter)
  let value = (position % 9) + 0
  if (value === 0) {
    value = 9
  }
  return value
}

function NumbersToResult (number) {
  let numberTab = number.toString().split('')
  while (numberTab.length > 1) {
    let newValue = 0
    numberTab.forEach(number => {
      newValue = newValue + parseInt(number)
    })
    numberTab = newValue.toString().split('')
  }
  return parseInt(numberTab)
}

function getNameValue (name) {
  const nameTab = name.split('')
  let value = 0
  nameTab.forEach(letter => {
    value = value + getLetterValue(letter)
  })
  return value
}

function getDateValue (birthDate) {
  const dateTab = birthDate.split('/')
  let value = 0
  dateTab.forEach(number => {
    value = value + parseInt(number)
  })
  return value
}

function birthYearDiff (date1, date2) {
  const date1Tab = date1.split('/')
  const year1 = parseInt(date1Tab[2])
  const date2Tab = date2.split('/')
  const year2 = parseInt(date2Tab[2])
  const diff = Math.abs(year1 - year2)
  const value = 12 - diff % 12
  return value
}

function calculSpotify () { // To do
  return 0
}

function dateFormat (date) {
  date = date.split('T')[0]
  date = date.replaceAll('-', '/')
  return date
}

export default {
  calculCompat (user1, user2) {
    dateFormat(user1.birthdate)

    var isSpotify = false
    var totalCompat = 0

    // Signs
    var user1Sign = getAstrologicalSign(dateFormat(user1.birthdate))
    var user2Sign = getAstrologicalSign(dateFormat(user2.birthdate))
    var signsresult = signsCompat[user1Sign][user2Sign]
    // console.log("Compat des signes", signsresult,"/5 ( ", user1Sign, " & ", user2Sign," )")
    totalCompat += signsresult * 20 / 5

    // First Names
    var valueUser1 = NumbersToResult(getNameValue(user1.username))
    var valueUser2 = NumbersToResult(getNameValue(user2.username))
    var valueTotal = valueUser1 + valueUser2
    var valueResult = NumbersToResult(valueTotal)
    // console.log("Compat des prénoms : ",valueResult,"/9")
    totalCompat += valueResult * 15 / 9

    // Last names
    var lastNameUser1 = NumbersToResult(getNameValue(user1.lastname))
    var lastNameUser2 = NumbersToResult(getNameValue(user2.lastname))
    var lastNameTotal = lastNameUser1 + lastNameUser2
    var lastNameResult = NumbersToResult(lastNameTotal)
    // console.log("Compat des noms : ",lastNameResult,"/9")
    totalCompat += lastNameResult * 10 / 9

    // Chineses signs ( but not really )
    var birthValue = birthYearDiff(dateFormat(user1.birthdate), dateFormat(user2.birthdate))
    // console.log("Compat d'années de naissance", birthValue,"/12")
    totalCompat += birthValue * 20 / 12

    // Birth Dates
    var valueDate1 = NumbersToResult(getDateValue(dateFormat(user1.birthdate)))
    var valueDate2 = NumbersToResult(getDateValue(dateFormat(user2.birthdate)))
    var totalDateValues = valueDate2 + valueDate1
    var valueDateResult = NumbersToResult(totalDateValues)
    // console.log("Total naissance : ", valueDateResult, "/9")
    totalCompat += valueDateResult * 15 / 9

    // Spotify
    if (isSpotify) {
      var spotifyValue = calculSpotify()
      totalCompat = +spotifyValue
    } else {
      totalCompat = totalCompat * 100 / 80
    }

    totalCompat = Math.round(totalCompat)
    console.log('Résultat : ', totalCompat, '% entre ', user1.username, ' & ', user2.username)
    return totalCompat
  }
}
