# GDScript Test Framework for Fujimo Game
# This file contains basic tests for the Godot project

extends GutTest

# Test StartScene functionality
func test_start_scene_exists():
	var start_scene = preload("res://scenes/StartScene.tscn")
	assert_not_null(start_scene, "StartScene should exist")

func test_start_scene_can_instantiate():
	var start_scene = preload("res://scenes/StartScene.tscn")
	var instance = start_scene.instantiate()
	assert_not_null(instance, "StartScene should be instantiable")
	instance.queue_free()

# Test TutorialScene functionality
func test_tutorial_scene_exists():
	var tutorial_scene = preload("res://scenes/TutorialScene.tscn")
	assert_not_null(tutorial_scene, "TutorialScene should exist")

func test_tutorial_scene_can_instantiate():
	var tutorial_scene = preload("res://scenes/TutorialScene.tscn")
	var instance = tutorial_scene.instantiate()
	assert_not_null(instance, "TutorialScene should be instantiable")
	instance.queue_free()

# Test GDScript files
func test_start_scene_script_exists():
	var script = load("res://scripts/StartScene.gd")
	assert_not_null(script, "StartScene script should exist")

func test_tutorial_scene_script_exists():
	var script = load("res://scripts/TutorialScene.gd")
	assert_not_null(script, "TutorialScene script should exist")

# Test asset loading
func test_character_assets_exist():
	var fujimo_idle = load("res://assets/sprites/characters/fujimo/frame_0_delay-0.1s.png")
	assert_not_null(fujimo_idle, "Fujimo idle animation should exist")

func test_furniture_assets_exist():
	var pc_texture = load("res://assets/sprites/furniture/pc.png")
	assert_not_null(pc_texture, "PC furniture texture should exist")

# Test project configuration
func test_project_settings():
	var project_name = ProjectSettings.get_setting("application/config/name")
	assert_eq(project_name, "Fujimo", "Project name should be Fujimo")

func test_main_scene_setting():
	var main_scene = ProjectSettings.get_setting("application/run/main_scene")
	assert_eq(main_scene, "res://scenes/StartScene.tscn", "Main scene should be StartScene")

# Test input actions
func test_input_actions_exist():
	assert_true(InputMap.has_action("move_left"), "move_left action should exist")
	assert_true(InputMap.has_action("move_right"), "move_right action should exist")
	assert_true(InputMap.has_action("move_up"), "move_up action should exist")
	assert_true(InputMap.has_action("move_down"), "move_down action should exist")
	assert_true(InputMap.has_action("click"), "click action should exist")