import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Connector',
      home: HomeScreen(),
    );
  } 
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        actions: [
          IconButton(
            iconSize: 72,
            icon: const Icon(Icons.person),
            onPressed: () {
              print("Test");
            }
          )
        ],
        backgroundColor: Colors.transparent,
        title: const Text("Constructor", style: TextStyle(fontFamily: "Times New Roman"))
      )
    );
  }
}