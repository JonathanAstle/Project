package com.qa.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBManager {
	static final String DB_URL = "jdbc:mysql://35.246.35.171/";
	static final String USER = "root";
	static final String PASS = "";
	
	Connection conn = null;
	Statement stmt = null;

	public void accessDB() {
		System.out.println("Accessing database...");
		try {
			//Class.forName("JDBC_DRIVER");
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void createEmptyDB(String DB) {
		try {
			System.out.println("Creating an empty database...");
			stmt.executeUpdate("DROP DATABASE IF EXISTS " + DB); //if exists
			stmt.executeUpdate("CREATE DATABASE " + DB);
			stmt.executeUpdate("USE " + DB);
			
			System.out.println("Created an empty database called: " + DB + ", and are now using it.");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void createTable(String table) {
		try {
			stmt.executeUpdate("DROP TABLE IF EXISTS " + table);
			stmt.executeUpdate("CREATE TABLE " + table + "(id VARCHAR(50) PRIMARY KEY, Turn_1 VARCHAR(100), Turn_2 VARCHAR(100), Turn_3 VARCHAR(100), Turn_4 VARCHAR(100), Turn_5 VARCHAR(100), Turn_6 VARCHAR(100), Turn_7 VARCHAR(100), Turn_8 VARCHAR(100), Turn_9 VARCHAR(100), Turn_10 VARCHAR(100), Turn_11 VARCHAR(100), Turn_12 VARCHAR(100));");
			
			System.out.println("Created a table with fields: id, Turn(1-12)");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	
	public void createEntry(String table, String nameOfOpening, String turn_1, String turn_2, String turn_3, String turn_4, String turn_5, String turn_6, String turn_7, String turn_8, String turn_9, String turn_10, String turn_11, String turn_12) {
		try {
			stmt.executeUpdate("INSERT INTO " + table + "(id, Turn_1, Turn_2, Turn_3, Turn_4, Turn_5, Turn_6, Turn_7, Turn_8, Turn_9, Turn_10, Turn_11, Turn_12) VALUES('" + nameOfOpening + "', '" + turn_1 + "', '" + turn_2 + "', '" + turn_3 + "', '" + turn_4 + "', '" + turn_5 + "', '" + turn_6 + "', '" + turn_7 + "', '" + turn_8 + "', '" + turn_9 + "', '" + turn_10 + "', '" + turn_11 + "', '" + turn_12 + "')");
			
			System.out.println("Inserted a record into the table: " + table + ", with 12 turns");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void readEntries(String table) {
		System.out.println("Creating statement...");
		try {
			//stmt = conn.createStatement()
			System.out.println("Reading from table...");
			ResultSet rs = stmt.executeQuery("SELECT * FROM " + table);
			while (rs.next()) {
				String id = rs.getString("id");
				String turn_1 = rs.getString("Turn_1");
				String turn_2 = rs.getString("Turn_2");
				String turn_3 = rs.getString("Turn_3");
				String turn_4 = rs.getString("Turn_4");
				String turn_5 = rs.getString("Turn_5");
				String turn_6 = rs.getString("Turn_6");
				String turn_7 = rs.getString("Turn_7");
				String turn_8 = rs.getString("Turn_8");
				String turn_9 = rs.getString("Turn_9");
				String turn_10 = rs.getString("Turn_10");
				String turn_11 = rs.getString("Turn_11");
				String turn_12 = rs.getString("Turn_12");

				System.out.println(id + turn_1 + turn_2 + turn_3 + turn_4 + turn_5 + turn_6 + turn_7 + turn_8 + turn_9 + turn_10 + turn_11 + turn_12);
			}
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	
	
	public void deleteEntry(String table, String id) {
		System.out.println("Creating statement...");
		try {
			//stmt = conn.createStatement();
			String sql4 = "DELETE FROM " + table + " WHERE id = " + id;
			stmt.executeUpdate(sql4);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	public void closeConnection() {
		try {
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
