package contract

import (
	"crypto/ecdsa"
	"fmt"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

type HeartbeatSigner struct {
	PrivateKey *ecdsa.PrivateKey
	Address    common.Address
}

func NewHeartbeatSigner(hexKey string) (*HeartbeatSigner, error) {
	key, err := crypto.HexToECDSA(hexKey)
	if err != nil {
		return nil, err
	}
	address := crypto.PubkeyToAddress(key.PublicKey)
	return &HeartbeatSigner{PrivateKey: key, Address: address}, nil
}

func (s *HeartbeatSigner) SignHeartbeat(timestamp int64) ([]byte, error) {
	// Message: "CortexGrid Heartbeat: <timestamp>"
	message := fmt.Sprintf("CortexGrid Heartbeat: %d", timestamp)
	hash := crypto.Keccak256Hash([]byte(message))

	signature, err := crypto.Sign(hash.Bytes(), s.PrivateKey)
	if err != nil {
		return nil, fmt.Errorf("failed to sign heartbeat: %w", err)
	}

	return signature, nil
}

func (s *HeartbeatSigner) StartHeartbeatLoop(interval time.Duration) {
	ticker := time.NewTicker(interval)
	for t := range ticker.C {
		sig, err := s.SignHeartbeat(t.Unix())
		if err != nil {
			fmt.Printf("Error signing heartbeat: %v\n", err)
			continue
		}
		fmt.Printf("[%s] Heartbeat signed: %x\n", t.Format(time.RFC3339), sig)
		// TODO: Call smart contract method slashProvider or checkIn
	}
}
