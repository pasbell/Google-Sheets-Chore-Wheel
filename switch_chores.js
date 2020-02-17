function switchChores() {
  var thisWeek = new Date()
  thisWeek.toDateString()

  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Chores")
  var choreList = ss.getRange(3, 2, 5, 1)
  ss.getRange(1, 2).setValue(thisWeek)
  
  var oldChore = choreList.getValues()
  var newChore = [[""],[""],[""],[""],[""]]

                    
  for(var i =0; i < oldChore.length; i++){

    newChore[i][0] = oldChore[(i+1)%5][0]
  }
    
  choreList.setValues(newChore)
  
  var emails = ss.getRange(3, 3, 5, 1).getValues()
  Logger.log(emails)
  
  for(var j=0; j< emails.length; j++){   
    var body = "This Week: " + newChore[j][0] + "\n\nNext Week: " + newChore[(j+1)%5][0]
    body = body + "\n\n Link to Sreadsheet: "+ "https://docs.google.com/spreadsheets/d/"+ SpreadsheetApp.getActiveSpreadsheet().getId() + "/edit"
    Logger.log(body)
    GmailApp.sendEmail(emails[j][0], "This Week's Chore Assignment!", body)
  }

  
}
