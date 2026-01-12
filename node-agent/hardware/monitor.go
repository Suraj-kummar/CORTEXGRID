package hardware

import (
	"encoding/xml"
	"fmt"
	"os/exec"
	"strconv"
	"strings"
)

type NvidiaSmiLog struct {
	GPU struct {
		ProductName string `xml:"product_name"`
		FBMemory    struct {
			Total string `xml:"total"`
			Used  string `xml:"used"`
			Free  string `xml:"free"`
		} `xml:"fb_memory_usage"`
		Temperature struct {
			GPUTemp string `xml:"gpu_temp"`
		} `xml:"temperature"`
	} `xml:"gpu"`
}

type Metrics struct {
	VRAMTotal int
	VRAMUsed  int
	Temp      int
	Name      string
}

func GetMetrics() (*Metrics, error) {
	cmd := exec.Command("nvidia-smi", "-q", "-x")
	output, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("failed to run nvidia-smi: %w", err)
	}

	var log NvidiaSmiLog
	if err := xml.Unmarshal(output, &log); err != nil {
		return nil, fmt.Errorf("failed to unmarshal nvidia-smi output: %w", err)
	}

	total := parseMemory(log.GPU.FBMemory.Total)
	used := parseMemory(log.GPU.FBMemory.Used)
	temp := parseTemp(log.GPU.Temperature.GPUTemp)

	return &Metrics{
		VRAMTotal: total,
		VRAMUsed:  used,
		Temp:      temp,
		Name:      log.GPU.ProductName,
	}, nil
}

func parseMemory(m string) int {
	clean := strings.TrimSuffix(m, " MiB")
	val, _ := strconv.Atoi(clean)
	return val
}

func parseTemp(t string) int {
	clean := strings.TrimSuffix(t, " C")
	val, _ := strconv.Atoi(clean)
	return val
}

func BenchmarkGPU() (float64, error) {
	// A real benchmark would run a CUDA kernel.
	// For now, we simulate a short test.
	return 15.5, nil // TFLOPS
}
