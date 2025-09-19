# Fujimo - Godot Project

A stress management game where you help Fujimo focus and reduce anxiety by managing falling objects and maintaining a healthy heart rate.

## Project Structure

```
Fujimo/
├── project.godot          # Main Godot project file
├── scenes/                # Game scenes (.tscn files)
│   ├── StartScene.tscn    # Main game scene with character movement
│   └── TutorialScene.tscn # Tutorial scene with heart rate mechanics
├── scripts/               # GDScript files
│   ├── StartScene.gd      # Main scene script
│   └── TutorialScene.gd   # Tutorial scene script
├── assets/                # Game assets
│   └── sprites/
│       ├── characters/    # Character sprites (Fujimo, Natasha)
│       ├── furniture/     # Room furniture sprites
│       └── objects/       # Interactive objects (heart, falling objects)
├── tests/                 # Test files
│   └── test_main.gd       # Main test suite
└── .github/
    └── workflows/
        └── godot-tests.yml # CI/CD workflow for testing
```

## How to Use

1. Open Godot Engine (version 4.2 or later)
2. Import this project by opening `project.godot`
3. The project will automatically recognize all scenes and assets
4. Press F5 to run the project or F6 to run the StartScene

## Game Mechanics

- **StartScene**: Move Fujimo around the room using WASD keys, interact with furniture
- **TutorialScene**: Learn the stress management mechanics - click falling objects to prevent heart rate increase

## Controls

- **WASD**: Move character
- **Mouse Click**: Interact with objects
- **Space/Enter**: Accept/Continue in menus

## Development

The project is fully converted from JavaScript/Phaser to GDScript/Godot with:
- Complete Godot project structure
- GDScript scenes with proper inheritance
- Organized asset hierarchy
- Test framework setup
- GitHub Actions workflow for CI/CD

All code, comments, and assets are organized following Godot conventions and English naming standards.