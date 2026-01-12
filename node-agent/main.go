package main

import (
	"fmt"
	"log"
	"time"

	"github.com/cortexgrid/node-agent/contract"
	"github.com/cortexgrid/node-agent/docker"
	"github.com/cortexgrid/node-agent/hardware"
)

func main() {
	fmt.Println("CortexGrid Node Agent Starting...")

	// 1. Benchmark Hardware
	metrics, err := hardware.GetMetrics()
	if err != nil {
		log.Printf("Warning: Failed to get live hardware metrics: %v", err)
		log.Println("Proceeding with default metrics for demonstration.")
		metrics = &hardware.Metrics{Name: "NVIDIA RTX 4090 (Simulated)", VRAMTotal: 24576, Temp: 45}
	}

	fmt.Printf("Hardware Detected: %s\n", metrics.Name)
	fmt.Printf("VRAM: %d MiB | Temp: %d C\n", metrics.VRAMTotal, metrics.Temp)

	tflops, _ := hardware.BenchmarkGPU()
	fmt.Printf("Projected Performance: %.2f TFLOPS\n", tflops)

	// 2. Initialize Docker Manager
	_, err = docker.NewManager()
	if err != nil {
		log.Printf("Warning: Docker manager initialization failed: %v", err)
	} else {
		fmt.Println("Docker Manager initialized.")
	}

	// 3. Start Heartbeat Loop (Simulated Private Key)
	demoPrivKey := "4c08832731b271d376995059635790be6136d400bcfa56b73b913467c648a202"
	signer, err := contract.NewHeartbeatSigner(demoPrivKey)
	if err != nil {
		log.Fatalf("Failed to initialize heartbeat signer: %v", err)
	}

	fmt.Printf("Node Address: %s\n", signer.Address.Hex())
	fmt.Println("Starting uptime heartbeat loop (60s interval)...")
	
	signer.StartHeartbeatLoop(60 * time.Second)
}
