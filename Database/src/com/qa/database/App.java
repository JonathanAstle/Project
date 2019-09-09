package com.qa.database;

public class App {

	public static void main(String[] args) {
		DBManager database = new DBManager();

		database.accessDB();
		
		database.createEmptyDB("openings");
		database.createTable("openings");
		
		database.createEntry("openings", "somethingGambit", "turn_1", "turn_2", "turn_3", "turn_4", "turn_5", "turn_6", "turn_7", "turn_8", "turn_9", "turn_10", "turn_11", "turn_12");
		database.createEntry("openings", "elelelleGambit", "turn_1", "turn_2", "turn_3", "turn_4", "turn_5", "turn_6", "turn_7", "turn_8", "turn_9", "turn_10", "turn_11", "turn_12");
		
		
		database.readEntries("openings");
		
	}

}
