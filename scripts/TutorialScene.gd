extends Node2D
class_name TutorialScene

# Tutorial scene - teaches player game mechanics

@onready var heart: Sprite2D
@onready var objects_container: Node2D
@onready var ui_container: Control
@onready var tutorial_label: Label

var heart_bpm := 60
var heart_tween: Tween
var objects: Array = []
var game_over := false
var win := false
var object_drop_interval := 1200.0
var object_timer := 0.0
var object_speed := 120.0
var object_scale := 0.4
var more_objects_every := 6500.0
var last_increase := 0.0
var spawn_amount := 1
var time_to_win := 60000.0
var tutorial_step := 0
var tutorial_texts := [
	"Welcome to the tutorial! Click to continue.",
	"You will see a heart beating in the center, help Fujimo focus.",
	"Objects will fall from the top of the screen.",
	"Some objects move in different ways. Pay attention!",
	"Click on objects to remove them before they reach the floor.",
	"If any object passes, the heart BPM increases!",
	"If BPM reaches 200, you lose.",
	"If you click 5 objects quickly, you get a bonus.",
	"Survive until the time runs out to win.",
	"Click to start!"
]

func _ready():
	setup_scene()
	setup_heart()
	setup_ui()
	setup_objects_container()
	start_tutorial()

func setup_scene():
	name = "TutorialScene"

func setup_heart():
	# Create heart sprite
	heart = Sprite2D.new()
	heart.name = "Heart"
	var texture = load("res://assets/sprites/objects/heart.png") as Texture2D
	if texture:
		heart.texture = texture
	heart.position = Vector2(512, 190)
	add_child(heart)
	
	# Start heart beating animation
	start_heart_beat()

func setup_ui():
	# Create UI container
	ui_container = Control.new()
	ui_container.name = "UI"
	add_child(ui_container)
	
	# BPM label
	var bpm_label = Label.new()
	bpm_label.name = "BPMLabel"
	bpm_label.text = "BPM: " + str(heart_bpm)
	bpm_label.position = Vector2(10, 10)
	bpm_label.add_theme_font_size_override("font_size", 24)
	ui_container.add_child(bpm_label)
	
	# Tutorial text label
	tutorial_label = Label.new()
	tutorial_label.name = "TutorialLabel"
	tutorial_label.position = Vector2(200, 50)
	tutorial_label.size = Vector2(600, 100)
	tutorial_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	tutorial_label.add_theme_font_size_override("font_size", 18)
	ui_container.add_child(tutorial_label)

func setup_objects_container():
	objects_container = Node2D.new()
	objects_container.name = "Objects"
	add_child(objects_container)

func start_tutorial():
	show_tutorial_text()

func show_tutorial_text():
	if tutorial_step < tutorial_texts.size():
		tutorial_label.text = tutorial_texts[tutorial_step]

func _input(event):
	if event is InputEventMouseButton and event.pressed:
		if tutorial_step < tutorial_texts.size():
			tutorial_step += 1
			if tutorial_step < tutorial_texts.size():
				show_tutorial_text()
			else:
				start_game()
		else:
			handle_object_click(event.position)

func start_game():
	tutorial_label.text = "Game Started! Click falling objects!"
	# Start spawning objects
	object_timer = 0.0

func _process(delta):
	if tutorial_step >= tutorial_texts.size() and not game_over and not win:
		object_timer += delta * 1000  # Convert to milliseconds
		
		if object_timer >= object_drop_interval:
			spawn_objects()
			object_timer = 0.0
		
		update_objects(delta)
		check_win_condition()

func spawn_objects():
	for i in range(spawn_amount):
		create_falling_object()

func create_falling_object():
	var obj = RigidBody2D.new()
	obj.name = "FallingObject"
	
	# Add sprite
	var sprite = Sprite2D.new()
	var texture = load("res://assets/sprites/objects/object.png") as Texture2D
	if texture:
		sprite.texture = texture
	sprite.scale = Vector2(object_scale, object_scale)
	obj.add_child(sprite)
	
	# Add collision
	var collision = CollisionShape2D.new()
	var shape = RectangleShape2D.new()
	shape.size = Vector2(32, 32)
	collision.shape = shape
	obj.add_child(collision)
	
	# Position randomly at top
	obj.position = Vector2(randf_range(50, 974), -50)
	
	# Set falling speed
	obj.gravity_scale = 0
	obj.linear_velocity = Vector2(0, object_speed)
	
	objects_container.add_child(obj)
	objects.append(obj)

func update_objects(delta):
	for i in range(objects.size() - 1, -1, -1):
		var obj = objects[i]
		if obj.position.y > 430:  # Object reached bottom
			object_missed(obj)
			objects.remove_at(i)

func object_missed(obj):
	# Increase heart BPM
	heart_bpm += 10
	if heart_bpm >= 200:
		game_over()
	
	update_bpm_display()
	obj.queue_free()

func handle_object_click(click_pos: Vector2):
	for i in range(objects.size() - 1, -1, -1):
		var obj = objects[i]
		if obj and is_instance_valid(obj):
			var obj_rect = Rect2(obj.position - Vector2(16, 16), Vector2(32, 32))
			if obj_rect.has_point(click_pos):
				object_clicked(obj)
				objects.remove_at(i)
				break

func object_clicked(obj):
	# Object successfully clicked
	obj.queue_free()
	# Add bonus logic here if needed

func start_heart_beat():
	if heart_tween:
		heart_tween.kill()
	
	heart_tween = create_tween()
	heart_tween.set_loops()
	
	var beat_duration = 60.0 / heart_bpm
	heart_tween.tween_method(animate_heart_beat, 1.0, 1.2, beat_duration * 0.3)
	heart_tween.tween_method(animate_heart_beat, 1.2, 1.0, beat_duration * 0.7)

func animate_heart_beat(scale_value: float):
	if heart:
		heart.scale = Vector2(scale_value, scale_value)

func update_bpm_display():
	var bpm_label = ui_container.get_node("BPMLabel") as Label
	if bpm_label:
		bpm_label.text = "BPM: " + str(heart_bpm)
	
	# Restart heart beat with new BPM
	start_heart_beat()

func game_over():
	game_over = true
	tutorial_label.text = "GAME OVER! BPM too high!"
	print("Game Over - BPM reached 200")

func check_win_condition():
	# Add win condition logic here
	pass